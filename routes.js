const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.render('index', { title: 'Home' })
});

if (process.env.NODE_ENV !== "production") {
  router.get("/error-test", () => {
    throw new Error("This is a test error.");
  });
}
module.exports = router;
