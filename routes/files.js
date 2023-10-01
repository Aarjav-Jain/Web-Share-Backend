const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const File = require("../models/file");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

//fileSize (in MB) here set to 10 MB
let upload = multer({ storage: storage, limits: { fileSize: 1000000 * 10 } });
let fileUpload = upload.single("myfile");

router.post("/", (req, res) => {
  fileUpload(req, res, async (err) => {
    // if (!req.file) res.status(500).json({ error: "Please Upload a file" });

    if (err) return res.status(500).send({ error: err.message });

    // console.log(req.file);
    const file = new File({
      fileName: req.file.filename,
      uuid: uuidv4(),
      path: req.file.path,
      size: req.file.size,
    });

    const response = await file.save();
    console.log(response);
    return res.json({
      file: `${process.env.APP_BASE_URL}/files/${response.uuid}`,
    });
    // return res.json({ msg: "return" });
  });
});

router.get("/", (req, res) => res.send("adnaskn"));
module.exports = router;
