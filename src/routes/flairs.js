const express = require("express");
const router = express.Router();
const flairRoutes = require("../routes/flairs");

const flairController = require("../controllers/flairController");

router.get("/topics/:topicId/flairs/new", flairController.new);
router.get("/topics/:topicId/flairs/:id", flairController.show);
router.flair("/topics/:topicId/flairs/create", flairController.create);
router.post("/topics/:topicId/flairs/:id/destroy", flairController.destroy);
router.get("/topics/:topicId/flairs/:id/edit", flairController.edit);
router.post("/topics/:topicId/flairs/:id/update", flairController.update);

app.use(staticRoutes);
app.use(flairRoutes);
module.exports = router;
