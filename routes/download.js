const express = require("express");
const router = express.Router();
const File = require("../models/file");

router.get("/:uuid", async (req, res) => {
  const file = await File.findOne({ uuid: req.params.uuid });

  if (!file) return res.json({ message: "File Link Expired" });

  const filePath = `${__dirname}/../${file.path}`;
  //   console.log(filePath);
  return res.download(filePath);
});

module.exports = router;
