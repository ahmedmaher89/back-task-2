const bookModel = require("../Models/book.cjs");

exports.getAllBooks = async function (req, res) {
  try {
    const Books = await bookModel.find();
    return res.json({ message: "done", data: Books });
  } catch (err) {
    return res.status(400).send({ message: err });
  }
};

exports.getOneBook = async function (req, res) {
  try {
    const Book = await bookModel.find({ _id: req.params.id });
    if (Book.length === 0) {
      return res.json({ message: "book not found", data: [] });
    } else {
      return res.json({ message: "done", data: Book });
    }
  } catch (err) {
    return res.status(400).send({ message: err });
  }
};

exports.addNewBook = async function (req, res) {
  try {
    if (req.user.role === "Admin") {
      const createdBook = await bookModel.create(req.body);
      return res.json({ message: "Book Aded Sucessfully", data: createdBook });
    } else {
      return res
        .status(403)
        .send({ message: "You are not authorized to add a book" });
    }
  } catch (err) {
    return res.status(400).send({ message: err });
  }
};

exports.deleteBook = async function (req, res) {
  try {
    if (req.user.role === "Admin") {
      await bookModel.findByIdAndDelete(req.params.id);
      return res.json({ message: "book deleted", data: [] });
    } else {
      return res
        .status(403)
        .send({ message: "You are not authorized to delete a book" });
    }
  } catch (err) {
    return res.status(400).send({ message: err });
  }
};

exports.updateBook = async function (req, res) {
  try {
    if (req.user.role === "Admin") {
      await bookModel.findOneAndUpdate({ _id: req.params.id }, req.body);
      return res.json({ message: "Book Updated", data: [] });
    } else {
      return res
        .status(403)
        .send({ message: "You are not authorized to update a book" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err });
  }
};
