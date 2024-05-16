const { Post } = require("../models");

const postData = [
  {
    title: "First Post",
    content: "This contains content of the first  post.",
    user_id: 1,
  },
  {
    title: "Second Post",
    content: "This contains content of the second post.",
    user_id: 2,
  },
  {
    title: "Third Post",
    content: "This contains content of the third post.",
    user_id: 3,
  },
  {
    title: "Fourth Post",
    content: "This contains content of the fourth post.",
    user_id: 4,
  },
  {
    title: "Fifth Post",
    content: "This contains content of the fifth post.",
    user_id: 5,
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;