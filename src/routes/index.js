const router = require("express").Router();

const authRoutes = require("./v1/auth");

//v2
// const campaignRoutes = require('./v1/campaign')

//! V1
// use the router
router.use("/api/v1/auth", authRoutes);

//! V2
// use the router
// router.use("/api/v2/campaigns", campaignRoutes);

module.exports = router;
