const router = require("express").Router();
const { controller: letterBoxController } = require("@/src/api/letter-box");

router.post("/", letterBoxController.createNew);
router.patch("/:id", letterBoxController.updateOne);
router.get("/", letterBoxController.getAll);
router.delete("/:id", letterBoxController.deleteOne);

module.exports = router;
