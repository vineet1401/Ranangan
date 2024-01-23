const {validateToken_JWT} = require("./jwtToken.js")

const checkAuthentication = (cookiename)=>{
    return (req, res, next)=>{
        const token = req.cookies[cookiename];

        if(!token){
            res.redirect("/login");
        }
        try{
            const payload = validateToken_JWT(token);
            if(!payload){
                res.clearCookie(cookiename);
                return res.render("login.ejs", {error:"Invalid Credentials"});
            }
            req.user = payload;
            return next()
        }
        catch(err){
            res.clearCookie(cookiename);
            return res.render("login.ejs", {error:"Try Again"});
        }
    }
}

module.exports = checkAuthentication;