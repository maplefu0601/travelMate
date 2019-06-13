const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Group = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    start: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    members: {
      type: Array,
    },
    createdBy: {
      type: String,
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['active', 'removed'],
    },
  },
  {
    collection: 'group',
  },
);

module.exports = mongoose.model('Group', Group);
