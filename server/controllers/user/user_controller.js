const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const firestore = require("../../config/db/firestore");
const User = require("../../models/User");

const createJWTToken = userId => {
    return new Promise(function (resolve, reject) {
        const payload = {
            user: {
                id: userId,
            },
        };

        jwt.sign(
            payload,
            config.get("jwtToken"),
            { expiresIn: 360000 },
            (err, token) => {
                ret = true;
                if (err) {
                    reject({
                        status: 400,
                        message: "Token could not be generated!!",
                    });
                }
                resolve({
                    status: 200,
                    token: token,
                });
            }
        );
    });
};

const createUser = async userDetails => {
    try {
        // Check if the user exists
        const { email, password } = userDetails;

        const db = firestore.getFirestoreDbObj();
        const userCollectionRef = db.collection("users");
        const snapshot = await userCollectionRef
            .where("email", "==", email)
            .limit(1)
            .get();
        if (!snapshot.empty) {
            return {
                status: 400,
                message: "A User with this email id already exists",
            };
        }

        // Generate other values
        const docRef = userCollectionRef.doc();
        const userId = docRef.id;
        const createdAt = new Date();
        const lastLogin = new Date();

        // Encrypt the user's password
        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(password, salt);

        // Initialize a new user object
        const userObject = new User(
            userDetails,
            userId,
            pass,
            createdAt,
            lastLogin
        );

        // Create the user
        const ref = await docRef.set(JSON.parse(JSON.stringify(userObject)));

        // Get JWT Token
        const returnResult = await createJWTToken(userId);

        return returnResult;
    } catch (error) {
        console.log("Create User Error : ", error);
        return {
            status: 500,
            message: "Server Error",
        };
    }
};

const getUserDetails = async userId => {
    try {
        // Check if user exists
        const db = firestore.getFirestoreDbObj();
        const userCollectionRef = db.collection("users");
        const snapshot = await userCollectionRef
            .where("userId", "==", userId.id)
            .limit(1)
            .get();
        if (snapshot.empty) {
            return {
                status: 401,
                message: "User does not exist!!",
            };
        }

        const resposeUserDetails = new Object();
        snapshot.forEach(doc => {
            resposeUserDetails.name = doc.data().name;
            resposeUserDetails.darkState = doc.data().darkState;
            resposeUserDetails.isAdmin = doc.data().isAdmin;
            resposeUserDetails.email = doc.data().email;
            resposeUserDetails.phoneNumber = doc.data().phoneNumber;
        });

        return {
            status: 200,
            userDetails: resposeUserDetails,
        };
    } catch (error) {
        console.log("Get User Details Error : ", error);
        return {
            status: 500,
            message: "Server Error",
        };
    }
};

const toggleUserDarkState = async userId => {
    try {
        // Check if user exists
        const db = firestore.getFirestoreDbObj();
        const userCollectionRef = db.collection("users");
        const snapshot = await userCollectionRef
            .where("userId", "==", userId.id)
            .limit(1)
            .get();
        if (snapshot.empty) {
            return {
                status: 401,
                message: "User does not exist!!",
            };
        }
        console.log("Here");
        const userDetails = new Object();
        snapshot.forEach(doc => {
            userDetails.userId = doc.data().userId;
            userDetails.darkState = doc.data().darkState;
        });

        await userCollectionRef.doc(userDetails.userId).update({
            darkState: !userDetails.darkState,
        });

        return {
            status: 200,
            message: "Success!!",
        };
    } catch (error) {
        console.log("Toggle User Dark State Error : ", error);
        return {
            status: 500,
            message: "Server Error",
        };
    }
};

module.exports = {
    createUser,
    createJWTToken,
    getUserDetails,
    toggleUserDarkState,
};
