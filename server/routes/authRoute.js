import express from "express";

import {
  registerController,
  loginController,
  testController,
  forgotPassword,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  getAllUsersController
} from "../controllers/authController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddlewares.js";

const router = express.Router();

//routing
//register
router.post("/register", registerController);

//login
router.post("/login", loginController);

//forgot password
router.post("/forgot-password",forgotPassword)


//test route
router.get("/test", testController);

//protected user route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected admin route
router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile

router.put("/update-profile",requireSignIn,updateProfileController)


//orders
router.get("/orders",requireSignIn, getOrdersController)

//admin orders

router.get("/all-orders",requireSignIn,isAdmin, getAllOrdersController)


//getting all users by the admin
router.get("/all-users",requireSignIn,isAdmin, getAllUsersController)
  

//order status update

router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusController);

export default router;
