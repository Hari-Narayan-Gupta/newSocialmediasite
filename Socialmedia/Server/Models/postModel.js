import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: [],
    desc: String,
    likes: [],
    comments:[],
    image: String
  },
  {
    timestamps: true,
  }
);

var PostModel = mongoose.model("Posts", postSchema);
export default PostModel;