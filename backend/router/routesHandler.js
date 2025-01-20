const express = require("express");
const questController = require("../controller/questController");
const quizController = require("../controller/quizController");
const practiceController = require("../controller/")
const upload = require("../middleware/upload");

const router = express.Router();

router.post('/questionpaper', 
  upload.fields([
    { name: 'file1', maxCount: 1 },
    { name: 'file2', maxCount: 1 }
  ]), 
  questController
);

router.post('/quizgeneration',
  upload.fields([
    { name: 'file', maxCount: 1 }
  ]),
  quizController
);

router.post('/practice',
  upload.fields([
    { name: 'file', maxCount: 1 }
  ]),
  practiceController
)

module.exports = router;