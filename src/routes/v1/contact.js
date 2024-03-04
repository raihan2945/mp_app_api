const router = require("express").Router();
const { controllers: contactController } = require("@/src/api/contact");

// const authenticate = require("../middleware/authenticate");
// const authorize = require("../middleware/authorize");
// const ownership = require('../middleware/ownership');

//* 
router.get("/tags", contactController.getAllUserTags);
//* 
router.post("/", contactController.createNewItem);

router.get("/", contactController.getAllItems);

router.get("/:id", contactController.getItemById);

router.put("/:id", contactController.updateItemById);

router.delete("/:id", contactController.deleteItemById);

module.exports = router;
