import express from "express";
import {
  createUser,
  loginUser,
  getAllUsers,
  updateUser,
} from "../controllers/users.js";

const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.get("/all", getAllUsers);
router.patch("/edit/:id", updateUser);

export default router;
