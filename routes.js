const express = require('express');
const db = require('./db/models');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const { check, validationResult} = require('express-validator');

const asyncHandler = handler => (req, res, next) => {
  // try to call the handler function on (req, res, next)
  // if that fails, it will call next(err)
  handler(req, res, next)
  .catch(next)
};

const parkValidators = [
  check("parkName")
    .exists({checkFalsy: true})
    .withMessage("Please provide a value for Park Name")
    .isLength({max:255})
    .withMessage("Park Name must not be more than 255 characters long"),
  check('city')
    .exists({checkFalsy:true})
    .withMessage("Please provide a value for City")
    .isLength({max:100})
    .withMessage("City must not be more than 100 characters long"),
  check("provinceState")
    .exists({checkFalsy:true})
    .withMessage("Please provide a value for Province/State")
    .isLength({max:100})
    .withMessage("Province/State must not be more than 100 characters long"),
  check("country")
    .exists({checkFalsy:true})
    .withMessage("Please provide a value for Country")
    .isLength({max:100})
    .withMessage("Country must not be more than 100 characters long"),
  check("opened")
    .isDate()
    .withMessage("Please provide a valid date for Opened")
    .exists({checkFalsy:true})
    .withMessage("Please provide a value for Opened"),
  check("size")
    .exists({checkFalsy:true})
    .withMessage("Please provide a value for Size")
    .isLength({max:100})
    .withMessage("Size must not be more than 100 characters long"),
  check("description")
    .exists({checkFalsy:true})
    .withMessage("Please provide a value for Description")
];

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

router.get(`/park/:id(\\d+)`, asyncHandler(async (req,res) => {
  const id = parseInt(req.params.id, 10);
  const park = await db.Park.findByPk(id);
  res.render('park-detail', {
    title: "Park Detail",
    park
  })
}));

router.get('/park/add', csrfProtection, (req, res) => {
  const newPark = db.Park.build()

  res.render('park-add', {
    title: 'Add Park',
    park: newPark,
    csrfToken: req.csrfToken()
  })
})

router.post('/park/add', csrfProtection, parkValidators, asyncHandler(async(req, res) => {

  const { parkName,
    city,
    provinceState,
    country,
    opened,
    size,
    description
  } = req.body;

  const park = db.Park.build({
    parkName,
    city,
    provinceState,
    country,
    opened,
    size,
    description
  })

  const validatorErrors = validationResult(req)

  if (validatorErrors.isEmpty()) {
    await park.save();
    res.redirect('/');
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('park-add', {
      title: 'Add Park',
      park,
      errors,
      csrfToken: req.csrfToken()
    })
  }
}))

router.get('/', (req, res) => {
  res.render('index', { title: 'Home' })
});

if (process.env.NODE_ENV !== "production") {
  router.get("/error-test", () => {
    throw new Error("This is a test error.");
  });
}





module.exports = router;
