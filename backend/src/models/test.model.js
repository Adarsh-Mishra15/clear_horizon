import mongoose,{Schema} from "mongoose"

const testSchema = new Schema(
    {
        owner:{type:Schema.Types.ObjectId, ref:"User"},
        acuity_score: { 
        type: Number, 
        required: true, 
        min: 0, // Minimum allowed value
        max: 2, // Maximum allowed value
        message: (props) => `${props.value} is not within the range of 0 to 2!`
      
    },
    cylinder_power:{type:Number, required:true},
    astigmation:{type:Number, required:true},
    blurness:{type:Number, required:true},
    screen_time:{type:Number,required:true},
    outdoor_activity:{type:Number,required:true},
    reading_posture:{type:String,required:true},
    reading_distance:{type:Number,required:true},
    lightning_condition:{type:String,required:true},
    screen_breaks:{type:Number,required:true}
    },
    {
        timestamps:true
    }
)

export const Test = mongoose.model('Test',testSchema)