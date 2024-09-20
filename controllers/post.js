const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");

module.exports = {
      getPosts: async (req, res) => {
        try { 
          const data = await Post.find().sort({ createdAt: "desc" }).lean();
          
          res.send({
            status: "success",
            posts: data,
            });
        } catch (err) {
          return res.send({
            status: "error",
            msg: "Failed to process request",
            err: err
            });
        }
      },

      myPosts: async (req, res) => {
        try { 
          const data = await Post.find({user: req.params.id})
          const posts = Object.keys(data).map((e)=> data[e])

          res.send({
            status: "success",
            posts: posts,
            });
        } catch (err) {
          return res.send({
            status: "error",
            msg: "Failed to process request",
            err: err
            });
        }
      },

      getPost: async (req, res) => {
        try {
          const post = await Post.findById(req.params.id);

          res.send({
            status: "success",
            post: post,
            });
        } catch (err) {
          return res.send({
            status: "error",
            msg: "Failed to process request",
            err: err
            });
        }
      },

      createPost: async (req, res) => {
        try {
          console.log(req.body)
  
          // Uploading post to db.
          await Post.create({
            title: req.body.title,
            images: req.body.imageList,
            description: req.body.description,
            location: req.body.location,
            user: req.body.userId,
          });

          return res.send({
            status: "success",
            msg: "Post added successfully!",
            });
        } catch (err) {
          return res.send({
            status: "error",
            msg: "Failed to process request",
            err: err
            });
        }
      },

      deletePost: async (req, res) => {
        try {
          let post = await Post.findById({ _id: req.params.id });
          console.log(req.params.id)

          // Delete old images from cloudinary.
          const imageNames = post.images.map(e=>e.slice(e.lastIndexOf('/')+1, e.lastIndexOf('.')))
          cloudinary.api.delete_resources(imageNames);

          // Delete post from db.
          await Post.deleteOne({ _id: req.params.id });
          console.log("Deleted Post");
          return res.send({
            status: "success",
            msg: "Post Deleted!",
            });
        } catch (err) {
          return res.send({
            status: "error",
            msg: "Failed to process request",
            err: err
            });;
        }
      },

      editPost: async (req, res) => {
        try {
          let post = await Post.findById({ _id: req.params.id });

          // DELETING SAVED IMAGES IN CLOUDINARY
          const imageNames = post.images.map(e=>e.slice(e.lastIndexOf('/')+1, e.lastIndexOf('.')))
          cloudinary.api.delete_resources(imageNames);

          // DOCUMENT UPDATE
          await Post.findOneAndUpdate({ _id: req.params.id }, {
            $set: {
              title: req.body.title,
              images: req.body.imageList,
              description: req.body.description,
              location: req.body.location,
              user: req.body.userId,
            }
          });

          return res.send({
            status: "success",
            msg: "Changes Saved!",
            });
        } catch (err) {
          return res.send({
            status: "error",
            msg: "Failed to process request",
            err: err
            });;
        }
      }
}