const express = require("express");
const {check} = require("express-validator");
const places = require("../controllers/places-controller");
const router = express.Router();


router.get('/',places.getPlaces);
router.get('/:pid',places.getPlaceById);
router.post('/',[check("title").not().isEmpty(),check("description").isLength({min:5})],places.createPlace);
router.patch('/:pid',places.updatePlaces);
router.delete('/:id',places.deletePlace);
router.get('/creator/:uid',places.getPlaceByUserID);

module.exports = router;