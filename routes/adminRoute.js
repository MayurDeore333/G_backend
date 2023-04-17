const express = require("express");
const {
  aregisterUser,
  aloginUser,
  alogout,
  agetUser,
  aloginStatus,
  aupdateUser,
  achangePassword,
  aforgotPassword,
  aresetPassword,
} = require("../controllers/adminController");
const protect = require("../middleWare/authMiddleware");
const router = express.Router();

router.post("/aregister", aregisterUser);
router.post("/alogin", aloginUser);
router.get("/alogout", alogout);
router.get("/agetuser", protect, agetUser);
router.get("/aloggedin", aloginStatus);
router.patch("/aupdateuser", protect, aupdateUser);
router.patch("/achangepassword", protect, achangePassword);
router.post("/aforgotpassword", aforgotPassword);
router.put("/aresetpassword/:resetToken", aresetPassword);

module.exports = router;
