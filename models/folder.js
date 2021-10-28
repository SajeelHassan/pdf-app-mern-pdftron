const mongoose = require("mongoose");

const FolderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  created: {
    type: String,
    required: false,
  },
  modified: {
    type: String,
    required: false,
  },
  fav: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Folder", FolderSchema);
