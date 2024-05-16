const { Comment } = require("../models");

const commentData = [
  {
    comment_text: "Great post!",
    user_id: 1,
    post_id: 1,
  },
  {
    comment_text: "Nice idea!",
    user_id: 2,
    post_id: 1,
  },
  {
    comment_text: "How did you come up this?",
    user_id: 3,
    post_id: 1,
  },
  {
    comment_text: "I'm not so sure I agree.",
    user_id: 4,
    post_id: 1,
  },
  {
    comment_text: "Can you elaborate more?",
    user_id: 5,
    post_id: 1,
  },
  {
    comment_text: "Interesting!",
    user_id: 1,
    post_id: 2,
  },
  {
    comment_text: "I love this topic!",
    user_id: 2,
    post_id: 2,
  }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;