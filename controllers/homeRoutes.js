//Import packages and models
const router = require("express").Router();
const { Post, User, Comment} = require("../models");
const withAuth = require("../utils/auth");

//Route to render homepage
router.get("/", async (req, res) => {
    try {
      // Get all Posts and JOIN with user data
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ["name"],
          },
        ],
      });
    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render("homepage", {
        posts,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Route to render individual post page
router.get("/post/:id", withAuth, async (req, res) => {
    try {
          // Find post by ID with associated username and comments with associated usernames
      const postData = await Post.findByPk(req.params.id, {
        include: [
          { model: User, attributes: ["name"] },
          {
            model: Comment,
            include: [{ model: User, attributes: ["name"] }],
          },
        ],
      });
      // Convert post data to plain JavaScript object
      const techPost = postData.get({ plain: true });
      // Render post template with post data and login status
      res.render("post", {
        ...techPost,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
          // If there is an error, return 500 status code and error message
      res.status(500).json(err);
    }
  });

  // Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await Post.findAll({
        where: {user_id: req.session.user_id },
        include: [{ model: User, attributes: ['name'] }],
      });
  
      const user = userData.map((user) => user.get({ plain: true }));
  
      res.render("profile", {
        user,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
// Route to render individual post page
router.get("/post/:id", withAuth, async (req, res) => {
    try {
          // Find post by ID with associated username and comments with associated usernames
      const postData = await Post.findByPk(req.params.id, {
        include: [
          { model: User, attributes: ["name"] },
          {
            model: Comment,
            include: [{ model: User, attributes: ["name"] }],
          },
        ],
      });
      // Convert post data to plain JavaScript object
      const post = postData.get({ plain: true });
      // Render post template with post data and login status
      res.render("post", {
        ...post,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
          // If there is an error, return 500 status code and error message
      res.status(500).json(err);
    }
  });

  // Render login page
router.get("/login", (req, res) => {
    if (req.session.logged_in) {
      res.redirect("/profile");
      return;
    }
    res.render("login");
  });

  router.get("/signup", (req, res) => {
    if (req.session.logged_in) {
      res.redirect("/profile");
      return;
    }
    res.render("signup");
  });

  // Render the new post page
router.get("/newpost", (req, res) => {
    if (req.session.logged_in) {
      res.render("newpost");
      return;
    }
    res.redirect("/login");
  });
  
  //Can add an edit post page below
  
module.exports = router;
  