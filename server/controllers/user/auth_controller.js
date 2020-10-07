const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const user_controller = require("../../controllers/user/user_controller");
const firestore = require("../../config/db/firestore");

const loginUser = async loginDetails => {
    try {
        // Check if user exists
        const { email, password } = loginDetails;

        const db = firestore.getFirestoreDbObj();
        const userCollectionRef = db.collection("users");
        const snapshot = await userCollectionRef
            .where("email", "==", email)
            .limit(1)
            .get();
        if (snapshot.empty) {
            return {
                status: 401,
                message: "Authentication Failed! Invalid user/password! :(",
            };
        }

        let encryptedPassword = null;
        let userId = null;
        snapshot.forEach(doc => {
            encryptedPassword = doc.data().password;
            userId = doc.data().userId;
        });

        // Check if the password is a match
        const isMatch = await bcrypt.compare(password, encryptedPassword);
        if (!isMatch) {
            return {
                status: 401,
                message: "Authentication Failed! Invalid user/password! :(",
            };
        }

        // Generate Java Web token and send it back
        const returnResult = await user_controller.createJWTToken(userId);

        return returnResult;
    } catch (error) {
        console.log("Login User Error : ", error);
        return {
            status: 500,
            message: "Server Error",
        };
    }
};

module.exports = { loginUser };
