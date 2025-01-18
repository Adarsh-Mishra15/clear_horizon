import { Test } from "../models/test.model.js";
import { ApiError } from "../utils/apierror.js";
import { ApiResponse } from "../utils/apiresponse.js";
import { User } from "../models/user.model.js";

// Create a new test entry
export const createTest = async (req, res) => {
  const {
    acuity_score,
    cylinder_power,
    astigmation,
    blurness,
    screen_time,
    outdoor_activity,
    reading_posture,
    reading_distance,
    lightning_condition,
    screen_breaks,
  } = req.body;

  // Check if all fields are present
  console.log(req.body);

  if (
    acuity_score === undefined ||
    cylinder_power === undefined ||
    astigmation === undefined ||
    blurness === undefined ||
    screen_time === undefined ||
    outdoor_activity === undefined ||
    reading_posture === undefined ||
    reading_distance === undefined ||
    lightning_condition === undefined ||
    screen_breaks === undefined
  ) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Ensure the user is authenticated (req.user should be populated)
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Create a new test document
    const test = await Test.create({
      owner: req.user._id,
      acuity_score,
      cylinder_power,
      astigmation,
      blurness,
      screen_time,
      outdoor_activity,
      reading_posture,
      reading_distance,
      lightning_condition,
      screen_breaks,
    });

    return res.status(201).json({
      message: 'Test created successfully',
      test: test, // Optionally return the created test
    });
  } catch (error) {
    console.error('Error creating test:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a test entry by ID
export const getTestById = async (req, res) => {
    const { id } = req.params;
    const test = await Test.findById(id).populate("owner"); // Populate owner details

    if (!test) {
      throw new ApiError(404, "Test not found");
    }

    return res.status(200).json(
      new ApiResponse(200,test,"Test data")
    );
};

// Get all test entries
export const getAllTests = async (req, res) => {
    const tests = await Test.find().populate("owner");

    return
    res.status(200).json(
      new ApiResponse(200,tests,"Test data")
    );
};

// Update a test entry by ID
export const updateTestById = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    // Update the Test document
    const updatedTest = await Test.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true, // Ensures validation rules are applied
    });

    if (!updatedTest) {
      throw new ApiError(404, "Test not found");
    }

    return res.status(200).json(
      new ApiResponse(200,"Data updated successfully")
    );
 
};

// Delete a test entry by ID
export const deleteTestById = async (req, res) => {
    const { id } = req.params;

    const deletedTest = await Test.findByIdAndDelete(id);

    if (!deletedTest) {
      throw new ApiError(404, "Test not found");
    }

    return res.status(200).json(
       new ApiResponse(200,"Deleted successfully")
    );
};

export const sendDataToFlaskForPrediction = async (req,res) => {
    // Fetch all data from the database
    const testData = await Test.find().populate(req.user._id);

    // Prepare the input data for prediction
    const inputData = testData.map((test) => [
      test.acuity_score,
      test.cylinder_power,
      test.astigmation,
      test.blurness,
      test.screen_time,
      test.outdoor_activity,
      test.reading_distance,
      test.screen_breaks,
    ]);

    // Send data to Flask
    const response = await axios.post("http://localhost:5000/predict-myopia-risk", {
      data: inputData,
    });

    console.log("Predictions from Flask:", response.data.predictions);

};