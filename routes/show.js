const express = require("express");
const router = express.Router();
const File = require("../models/file");

router.get("/:uuid", async (req, res) => {
  try {
    const file = await File.findOne({ uuid: req.params.uuid });
    if (!file) return res.json({ message: "File Link Expired" });

    return res.json({
      uuid: file.uuid,
      fileName: file.fileName,
      fileSize: file.size,
      downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
      createdAt: file.createdAt,
    });
  } catch (err) {
    console.log("Error in finding file in route /files", err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
});

module.exports = router;
