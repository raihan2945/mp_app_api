const router = require("express").Router();

const authRoutes = require("./v1/auth");
const scheduleRoutes = require("./v1/schedule");
const cateogryRoutes = require("./v1/category");
const contactRoutes = require("./v1/contact");
const folderRoutes = require("./v1/folder");
const mediaRoutes = require("./v1/media");

// use the router
router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/schedules", scheduleRoutes);
router.use("/api/v1/categories", cateogryRoutes);
router.use("/api/v1/contacts", contactRoutes);
router.use("/api/v1/folders", folderRoutes);
// router.use("/api/v1/mediaRoutes", mediaRoutes);

module.exports = router;
