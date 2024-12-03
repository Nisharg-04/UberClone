const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");
const captainController = require("../controllers/captain.controller");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("fullname.firstname")
      .isLength({
        min: 3,
      })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({
        min: 6,
      })
      .withMessage("Password must be at least 6 characters long"),
    body("vehicle.color")
      .isLength({
        min: 3,
      })
      .withMessage("Color must be at least 3 characters long"),
    body("vehicle.plate")
      .isLength({
        min: 3,
      })
      .withMessage("Plate must be at least 3 characters long"),
    body("vehicle.capacity")
      .isLength({
        min: 1,
      })
      .withMessage("Capacity must be at least 1"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Vehicle type must be car, bus or van"),
  ],
  captainController.registerCaptain
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({
        min: 6,
      })
      .withMessage("Password must be at least 6 characters long"),
  ],
  captainController.loginCaptain
);
router.get(
  "/profile",
  authMiddleware.authCaptain,
  captainController.getProfile
);
router.get(
  "/logout",
  authMiddleware.authCaptain,
  captainController.logoutCaptain
);
module.exports = router;