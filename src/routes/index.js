const router = require("express").Router();

const authRoutes = require("./v1/auth");
const scheduleRoutes = require("./v1/schedule");
const cateogryRoutes = require("./v1/category");
const contactRoutes = require("./v1/contact");
const folderRoutes = require("./v1/folder");
const mediaRoutes = require("./v1/media");
const appointmentRoutes = require("./v1/appointment");
const letterBoxRoutes = require("./v1/letterBox");

// use the router
router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/schedules", scheduleRoutes);
router.use("/api/v1/categories", cateogryRoutes);
router.use("/api/v1/contacts", contactRoutes);
router.use("/api/v1/folders", folderRoutes);
router.use("/api/v1/media", mediaRoutes);
router.use("/api/v1/appointment", appointmentRoutes);
router.use("/api/v1/letter-box", letterBoxRoutes);

module.exports = router;
