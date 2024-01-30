const router = require("express").Router();
const { controllers: folderController } = require("@/src/api/folder");

// const authenticate = require("../middleware/authenticate");
// const authorize = require("../middleware/authorize");
// const ownership = require('../middleware/ownership');

// //* : GET ALL TRAINING BY DOCTOR
router.post("/", folderController.createNewItem);

router.get("/", folderController.getAllItems);

router.get("/:id", folderController.getItemById);

router.put("/:id", folderController.updateItemById);

router.delete("/:id", folderController.deleteItemById);

module.exports = router;
