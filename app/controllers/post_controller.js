import Post from '../models/post_model';

// this cleans the posts because we use id instead of dangling _id
// and we purposefully don't return content here either
const cleanPosts = (posts) => {
  return posts.map(post => {
    return { id: post._id, title: post.title, tags: post.tags, content: post.content };
  });
};

export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.tags = req.body.tags;
  post.content = req.body.content;
  post.save()
  .then(result => {
    res.json({ message: 'Post created!' });
  })
  .catch(error => {
    res.json({ error });
  });
};

export const getPosts = (req, res) => {
  Post.find({}).sort('-date')
  .then(result => {
    res.json(cleanPosts(result));
  })
  .catch(error => {
    res.json({ error });
  });
};

export const getPost = (req, res) => {
  Post.findById(req.params.id)
  .then(result => {
    res.json(result);
  })
  .catch(error => {
    res.json({ error });
  });
};
// removing all my posts?
export const deletePost = (req, res) => {
  Post.findByIdAndRemove(req.params.id)
  .then(result => {
    res.json({ message: 'Post removed!' });
  })
  .catch(error => {
    res.json({ error });
  });
};

export const updatePost = (req, res) => {
  Post.findByIdAndUpdate(req.params.id, { title: req.body.title, tags: req.body.tags, content: req.body.content })
  .then(result => {
    res.json(result);
  })
  .catch(error => {
    res.json({ error });
  });
};

export default Post;
