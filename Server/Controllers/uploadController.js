// Upload Controller: Handles file uploads. Because books need their cover shots too.

const Book = require("../Models/Book");




const uploadController = async (req, res) => {
  try {
    const bookId = req.params.id;
    const foundBook = await Book.findById(bookId);

    if (!foundBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    foundBook.coverImage = req.file.filename; // just store filename
    await foundBook.save();

    res.status(200).json({
      message: "Image uploaded successfully",
      imageUrl: `/uploads/${req.file.filename}`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
    //rollback image upload if needed
    if (req.file) {
      const fs = require("fs");
      fs.unlinkSync(req.file.path); // delete the uploaded file
    }
  }
};

module.exports = uploadController;
