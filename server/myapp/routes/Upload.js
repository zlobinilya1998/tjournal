const { Router } = require("express");
const router = Router();
const multer = require("multer");
const upload = multer({ dest: "public/images/news/" });

router.post("/", upload.single("file"), async (req, res) => {
  res.send(req.file.filename);
});

module.exports = router;
