const express = require('express');
const db = require('./db/models');
const router = express.Router();

const asyncHandler = handler => (req, res, next) => {
  // try to call the handler function on (req, res, next)
  // if that fails, it will call next(err)
  handler(req, res, next)
  .catch(next)
};

// router.get('/', asyncHandler(async (req, res) => {
//   const books = await db.Book.findAll({ order: [['title', 'ASC']] });
//   res.render('book-list', { title: 'Books', books });
// }));

router.get('/parks', asyncHandler(async (req, res) => {
  // TODO: Await database query
  const parks = await db.Park.findAll({
    order: [['parkName']]
  });
  // TODO: Render template
  res.render('park-list', {
    title: "Parks",
    parks
  });
}));

router.get('/', (req, res) => {
  res.render('index', { title: 'Home' })
});

if (process.env.NODE_ENV !== "production") {
  router.get("/error-test", () => {
    throw new Error("This is a test error.");
  });
}





module.exports = router;
