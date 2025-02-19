import express from "express";
import { handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateNewUser } from "../controllers/user.js"; // 👈 Add `.js`

const router = express.Router();

router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

export default router;
