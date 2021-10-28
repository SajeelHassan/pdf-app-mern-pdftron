const folderRouter = require("express").Router();
const Folder = require("../models/folder.js");

folderRouter.post("/create", async (req, res) => {
  try {
    const body = await JSON.parse(JSON.stringify(req.body));

    var folder = new Folder({
      name: body.name,
      type: "folder",
      created: body.created,
      modified: body.modified,
      fav: false,
    });
    // Save Folder
    await folder.save();
    console.log(folder);
    res.status(200).json({ data: folder });
  } catch (err) {
    console.log(err);
  }
});

folderRouter.get("/", async (req, res) => {
  try {
    const folders = await Folder.find();

    res.status(200).json({ success: true, data: folders });
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

module.exports = folderRouter;
