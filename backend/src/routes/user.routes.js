import { Router } from "express";
import { 
    registerUser,
    logInUser,
    logOutUser, 
} from "../controllers/user.controller.js";

// import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

// User registration route
router.route('/register').post(registerUser); 

// User login route
router.route('/login').post(logInUser);

// Secured routes (requiring JWT token)
router.route('/logout').post(verifyJWT, logOutUser);  // Changed GET to POST for logout

export default router;