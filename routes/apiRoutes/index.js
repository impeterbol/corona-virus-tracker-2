const router = require("express").Router();
const placesRoutes = require("./places");
const categoriesRoutes = require("./categories");
const prayerRoutes = require("./prayers");
const redmondLocalSeeding = require("./redmondLocalSeeding");

router.use("/seeding", redmondLocalSeeding);
router.use("/places", placesRoutes);
router.use("/categories", categoriesRoutes);
router.use("/prayers", prayerRoutes);

module.exports = router;