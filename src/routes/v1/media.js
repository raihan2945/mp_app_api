const router = require("express").Router();
const { controllers: mediaController } = require("@/src/api/media");

// const authenticate = require("../middleware/authenticate");
// const authorize = require("../middleware/authorize");
// const ownership = require('../middleware/ownership');

//* 
router.post("/", mediaController.createNewItem);

router.get("/", mediaController.getAllItems);

router.get("/:id", mediaController.getItemById);

router.put("/:id", mediaController.updateItemById);

router.delete("/:id", mediaController.deleteItemById);

module.exports = router;