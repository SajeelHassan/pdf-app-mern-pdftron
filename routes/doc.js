const router = require("express").Router();
const cloudinary = require("../utils/cloudinary.js");
const upload = require("../utils/multer.js");
const Doc = require("../models/doc.js");

router.post("/uploadfile", upload.single("uploading"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const body = await JSON.parse(JSON.stringify(req.body));
    // Create new user
    var doc = new Doc({
      name: body.name,
      size: body.size,
      created: body.created,
      filetype: body.type,
      color: body.color,
      fav: false,
      pdfFile: result.secure_url,
      cloudId: result.public_id,
      annot: "",
      modified: body.created,
    });
    // Save user
    await doc.save();
    console.log(doc);
    res.status(200).json({ data: doc });
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const docs = await Doc.find();

    res.status(200).json({ success: true, data: docs });
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

// router.delete("/:id", async (req, res) => {
//   try {
//     // Find user by id
//     let user = await User.findById(req.params.id);
//     // Delete image from cloudinary
//     await cloudinary.uploader.destroy(user.cloudinary_id);
//     // Delete user from db
//     await user.remove();
//     res.json(user);
//   } catch (err) {
//     console.log(err);
//   }
// });

router.post("/updatePdf", async (req, res) => {
  // console.log(req.body.fileId);
  try {
    const doc = await Doc.findById(req.body.fileId);
    await doc.updateOne({
      annot: req.body.annotString,
      modified: req.body.modifiedDate,
    });
    // const doc = await Doc.findOneAndUpdate(
    //   { _id: req.body.fileId },
    //   { annot: req.body.annotString, modified: req.body.modifiedDate },
    //   { new: true },
    //   (err, response) => {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       console.log("Updated User : ", doc);
    //     }
    //   }
    // );
    // const doc = await Doc.findoneAndUpdate(
    //   { _id: req.body.fileId },
    //   { annot: req.body.annotString, modified: req.body.modifiedDate }
    // );
    // await res.json(doc);
    // await doc.save();
    // console.log(doc);
    res.status(200).json({ data: doc });
  } catch (err) {
    console.log(err);
  }
});

router.get("/view/:id", async (req, res) => {
  try {
    // Find user by id
    let doc = await Doc.findById(req.params.id);
    res.json(doc);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
