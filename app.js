// 1. Require modules
const express = require("express");
const ejs = require("ejs");
const _ = require("lodash");
const posts = [];
const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices condimentum sem vel laoreet. Aenean vulputate eu felis non elementum. Phasellus malesuada aliquam magna, vitae cursus erat auctor nec. Quisque porta venenatis libero, ut varius lacus porta a. Proin pretium condimentum metus, accumsan eleifend purus malesuada vitae." ;
const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit Mauris nec tristique mi. Nulla nulla purus, ornare sit amet ultricies ut, consectetur a elit. Nulla a placerat lectus.";
const contactContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit  Mauris auctor iaculis maximm.Suspendisse scelerisque quis enim nec ultrices. Nulla ac malesuada odio. Maecenas efficitur quam id justo auctor, ac mollis sapien venenatis. Maecenas cursus placerat ornare.";

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
// post = require(__dirname + "/post.js")
app.get("/", (req, res)=>{
  res.render("home", ({home: homeStartingContent, homePage:posts, }));
  
});
app.get("/about", (req, res)=>{
  res.render("about", ({about:aboutContent}))
});
app.get("/contact", (req, res)=>{
  res.render("contact", ({contact:contactContent}))
});
app.get("/compose", (req, res)=>{
  res.render("compose")
});

app.post("/", (req, res)=>{
const post = {
  title: req.body.postTitle,
  content: req.body.postBody
};
posts.push(post);
res.redirect("/");
});
app.get("/posts/:postName",(req, res)=>{
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach((post)=>{
    const storedtitle = _.lowerCase(post.title);
    const contentPosted = post.content;
    if (storedtitle === requestedTitle ){
      res.render("post", ({nameTitle: storedtitle, postName: contentPosted}))
     
    }
   });
});
// 6. Start the server
app.listen(3000, function() {
    console.log("Server started on port 3000");
});