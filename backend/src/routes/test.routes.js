import express from "express";
import {
  createTest,
  getTestById,
  getAllTests,
  updateTestById,
  deleteTestById,
  sendDataToFlaskForPrediction,
} from "../controllers/test.controller.js"; // Adjust the path if needed
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

// Route to create a new test
router.post("/",verifyJWT, createTest);

// Route to get a test by its ID
router.get("/:id", getTestById);

// Route to get all tests
router.get("/", getAllTests);

// Route to update a test by its ID
router.put("/:id", updateTestById);

// Route to delete a test by its ID
router.delete("/:id", deleteTestById);

router.post("/sendData",verifyJWT,sendDataToFlaskForPrediction)

export default router;
