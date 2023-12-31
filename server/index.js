require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require('./connect');
const Book = require('./models/book');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 8000;
connectDB();
app.use(cors());
app.use(express.urlencoded( {extended: true}));
app.use(express.json());
app.use('/uploads',express.static('uploads'))

app.get("/api/books", async (req,res) => {
   try {
    const category = req.query.category;
    //const stars = req.query.stars;

    const filter = {};
    if(category) {
      filter.category = category;
    }

    const data = await Book.find(filter);
    
    if (!data) {
      throw new Error("An error occurred while fetching books.");
    }
    
    res.status(201).json(data);
   } catch (error) {
    res.status(500).json('error finding book')
   }
});

// Get Single book
app.get("/api/books/:_id", async (req,res) => {
    try {
        const idparam = req.params._id;
        const data = await Book.findOne( {_id: idparam})
        if (!data) {
            throw new Error("An error occurred while fetching a book.");
          }
          
          res.status(201).json(data);
    } catch (error) {
        res.status(500).json({error: "An error occurred while fetching books."})
    }
})
// create single book

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
})

const upload = multer({ storage: storage })

app.post("/api/books/",upload.single('thumbnail') ,async (req,res) => {
  try {
      const newBook = new Book({
        title: req.body.title,
        slug: req.body.slug,
        description: req.body.description,
        stars: req.body.stars,
        category: req.body.category,
        thumbnail: req.file.filename
      });
      await Book.create(newBook)
      res.json('book submitted')
  } catch (error) {
      res.status(500).json({error: "An error occurred while fetching books."})
  }
})

app.put("/api/books/",upload.single('thumbnail') ,async (req,res) => {
  try {

      const bookId = req.body.bookId;
      const updateBook = {
        title: req.body.title,
        slug: req.body.slug,
        description: req.body.description,
        stars: req.body.stars,
        category: req.body.category,
        
      };

      if(req.file) {
        updateBook.thumbnail = req.file.filename
      }
      await Book.findByIdAndUpdate(bookId, updateBook);
      res.json('book submitted')
  } catch (error) {
      res.status(500).json({error: "An error occurred while fetching books."})
  }
})


app.delete("/api/books/:id", async(req,res) => {
  const bookId = req.params.id;

  try {
    await Book.deleteOne({_id: bookId});
    res.json("How dare you!" + req.body.bookId);
  } catch (error) {
    res.json(error);
  }
});



app.get("/", (req,res) => {
    res.json("Hello World")
});

app.listen(PORT, () => {
    console.log(`the port is ${PORT}`)
});