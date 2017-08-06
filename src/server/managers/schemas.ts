import mongoose = require('mongoose');
let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

let CommentSchema = new Schema({
  name: {
    type: String,
    default: 'hahaha'
  },
  date:{
    type: Date,
    default: new Date()
  },
  buff: Buffer
})

let ProjectSchema = new Schema({
  _active: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: 'Unnamed project'
  },
  author: {
    type: String,
    default: 'Unknown author'
  },
  email: {
    type: String,
    default: ''
  },
  shortDescription: {
    type: String,
    default: 'A short description'
  },
  description: {
    type: String,
    default: 'No description'
  },
  institution: {
    type: String,
    default: 'No institution'
  },
  date: {
    type: Date,
    default: new Date()
  },
  tags: {
    type: Array,
    default: []
  },
  references: {
    type: Array,
    default: []
  },
  comments: {
    type: [CommentSchema]
  }
});

export { ProjectSchema, CommentSchema };
