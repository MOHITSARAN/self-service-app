const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
    const authToken = req.header("x-auth-token");
    if (!authToken) {
        return res
            .status(401)
            .json({ message: "Sorry, No Tokens No Access !!" });
    }

    try {
        const decode = jwt.verify(authToken, config.get("jwtToken"));
        req.user = decode.user;
        next();
    } catch (err) {
        console.log("Middleware auth error : ", err);
        res.status(401).json("Your WebToken could not be validated.");
    }
};
