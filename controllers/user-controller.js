const { validationResult } = require("express-validator");
const uuid = require("uuid");
const HttpError = require("../models/httpError");
let DUMMY_CONTENT = [
    {
      id: 'u1',
      username: 'Ahmad',
      email: 'ahmad@gmail.com',
      password:123
    }
];
// get All Users
const getUsers = (req,resp,next) => {
    resp.json({message: DUMMY_CONTENT});
};
// Signup 
const signUp = (req,resp,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(
            new HttpError("Invalid Input Please FIll The Inputs,",422)
        );
    }
    const {username,email,password} = req.body;
    const hasUser = DUMMY_CONTENT.find(u=>u.email === email);
    if(hasUser){
        throw new HttpError("sorry Could not Add User This User Already Exists,",422)
    }
    const createUser = {id:uuid(),username,email,password};
    DUMMY_CONTENT.push(createUser);
    resp.status(201).json({message:createUser});
};
// login 
const login = (req,resp,next) => {
    const {email,password} = req.body;
    const identifier = DUMMY_CONTENT.find(u => u.email === email);
    if(!identifier || identifier.password !== password){
        throw new HttpError("Could Not Find Any User Sorry Bro,",404);
    } 
    resp.json({login:"You are Welcome You are successfully loged In."});

};

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.login = login;