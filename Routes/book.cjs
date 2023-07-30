const Router = require("express");
const authMidlleWare = require('../middlewares/auth.cjs')
const bookController = require('../Controllers/bookController.cjs')
const router = Router.Router();

router.post("/api/books" , authMidlleWare , bookController.addNewBook); //admin only
router.get("/api/books" , authMidlleWare , bookController.getAllBooks);
router.get('/api/books/:id', authMidlleWare, bookController.getOneBook);
router.put('/api/books/:id', authMidlleWare, bookController.updateBook); //admin only
router.delete('/api/books/:id', authMidlleWare, bookController.deleteBook); //admin only



module.exports = router;
