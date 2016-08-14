import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  title: String,
  tags: String,
  content: String,
  author: String,
});

const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
