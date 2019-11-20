const path = require("path"),
  express = require("express"),
  mongoose = require("mongoose"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  dataRouter = require("../routes/data.server.routes"),
  multer = require("multer"),
  fs = require('fs');

//var uploadejs = fs.readFileSync('upload.ejs', 'utf-8');

module.exports.init = () => {
  /* 
        connect to database
        - reference README for db uri
    */
  mongoose.connect(process.env.DB_URI || require("./config").db.uri, {
    useNewUrlParser: true
  });
  mongoose.set("useCreateIndex", true);
  mongoose.set("useFindAndModify", false);

  // initialize app
  const app = express();

  // Set the storage engine for multer
  const storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: function(req, file, cb) {
      // null as first argument means no error
      cb(null, Date.now() + "-" + file.originalname);
    }
  });

  // Initial upload
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1000000
    },

    fileFilter: function(req, file, cb) {
      sanitizeFile(file, cb);
    }
  }).single("files");

  // Set view engine
  app.set("view engine", "ejs");

  // Set static folder
  app.use(express.static("./public"));

  // enable request logging for development debugging
  app.use(morgan("dev"));

  // body parsing middleware
  app.use(bodyParser.json());

  // add a router
  app.use("/api", dataRouter);

  
  app.get('/temp', (req, res) => {
    res.send('Hello')
    ejs.renderFile(Users/davie/GitHub/paracosm-proj/paracosm-proj/client/src/views + '/upload.ejs', function(err,data){
        console.log('HELLO')
    })
})
  // Handle the upload route
  app.post("/upload", (req, res) => {
    // res.send('done');
    upload(req, res, err => {
      if (err) {
        res.render('upload', { msg: err });
      } else {
        // If file is not selected
        if (req.file == undefined) {
          res.render('upload', { msg: "No file selected!" });
        } else {
          res.render('upload', { msg: "File uploaded successfully!" });
        }
      }
    });
  });
  function sanitizeFile(file, cb) {
    // Define the allowed extension
    let fileExts = ["png", "jpg", "jpeg", "gif"];

    // Check allowed extensions
    let isAllowedExt = fileExts.includes(
      file.originalname.split(".")[1].toLowerCase()
    );
    // Mime type must be an image
    let isAllowedMimeType = file.mimetype.startsWith("image/");

    if (isAllowedExt && isAllowedMimeType) {
      return cb(null, true); // no errors
    } else {
      // pass error msg to callback, which can be displaye in frontend
      cb("Error: File type not allowed!");
    }
  }

  if (process.env.NODE_ENV === "production") {
    // Serve any static files
    app.use(express.static(path.join(__dirname, "../../client/build")));

    // Handle React routing, return all requests to React app
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
    });
  }

  return app;
};
