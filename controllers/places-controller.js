const { validationResult } = require("express-validator");
const HttpError = require("../models/httpError");



let DUMMY_PLACES = [
    {
      id: 'p1',
      title: 'Empire State Building',
      description: 'One of the most famous sky scrapers in the world!',
      location: {
        lat: 40.7484474,
        lng: -73.9871516
    },
    address: '20 W 34th St, New York, NY 10001',
      creator: 'u1'
    }
];

// Get Place By UserID
const getPlaceByUserID = (req,resp,next)=>{
    let userID = req.params.uid;
    const data = DUMMY_PLACES.filter(p=>{
        return p.creator === userID
    });
    if(!data || data.length === 0){
       return next(
         new HttpError("Sorry There is No Place With This User ID",404)
       )
    }
    resp.json({data});
}

// Get All Places In this Server with Limit
const getPlaces = (req,resp,next)=>{
    resp.json({message:DUMMY_PLACES});
};

// get Place By ID
const getPlaceById = (req,resp,next)=>{
    const reqParam = req.params.pid;
    const getData = DUMMY_PLACES.find(p=>p.id == reqParam);

    if(!getData || getData.length === 0){
        throw new HttpError("Sorry There is No Place with that ID,",404);

    }
    resp.json({getData});
}
// Create Place 
const createPlace = (req,resp,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(
            new HttpError("Invalid Input Please FIll The Inputs,",404)
        );
    }
    const {id,title,description,address,creator} = req.body;

    const createPlace = {
        id,title,description,address,creator
    }
    DUMMY_PLACES.push(createPlace);
    resp.status(201).json({place:createPlace})
}
// patch Or Edit place
const updatePlaces = (req,resp,next)=>{
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError("Sorry There is no Place to Update with This ID, ",404);
    }
    const {title, description} = req.body;
    const placeId = req.params.pid
    const updatedPlace =  {...DUMMY_PLACES.find(p=>p.id === placeId)}
    const placeIndex = DUMMY_PLACES.findIndex(p=>p.id === placeId);

    updatedPlace.title = title;
    updatedPlace.description = description;    
    
    DUMMY_PLACES[placeIndex] = updatedPlace;
    resp.status(200).json(updatedPlace);
}
// Delete Place 
const deletePlace = (req,resp,next)=>{
    const PlaceId = req.params.id;
    if(!DUMMY_PLACES.find(p=>p.id === PlaceId)){
        throw new HttpError("Sorry There is no Place with This ID,",404);
    }
    DUMMY_PLACES.filter(p=>p.id !== PlaceId);
    resp.status(200).json({message: DUMMY_PLACES})
}
exports.getPlaces = getPlaces;
exports.getPlaceById = getPlaceById;
exports.createPlace = createPlace;
exports.updatePlaces = updatePlaces;
exports.deletePlace = deletePlace;
exports.getPlaceByUserID = getPlaceByUserID;