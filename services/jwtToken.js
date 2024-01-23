const jwt = require("jsonwebtoken");
const env = require("dotenv").config()

const SECRET_KEY = process.env.SECRET_KEY


const generateToken_JWT = (username, password)=>{
    const payload = {
        username:username,
        password:password
    }
    const token = jwt.sign(payload, SECRET_KEY)
    return token
}

const validateToken_JWT = (token)=>{
    const payload = jwt.verify(token, SECRET_KEY)
    if(payload.username=="admin" && payload.password=="admin") return payload;
    return null;

}

module.exports = {
    generateToken_JWT , validateToken_JWT
}