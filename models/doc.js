const mongoose = require("mongoose");

const DocSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  created: {
    type: String,
    required: true,
  },
  filetype: {
    type: String,
    required: true,
  },
  pdfFile: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  fav: {
    type: Boolean,
    required: true,
  },
  cloudId: {
    type: String,
    required: true,
  },
  annot: {
    type: String,
    required: false,
  },
  modified: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Doc", DocSchema);
