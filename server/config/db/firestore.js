const admin = require("firebase-admin");
const serviceAccount = require("./../FirestoreKey.json");
let db = null;

// const docRef = db.collection("users").doc("alovelace");

const connectFirestore = () => {
    try {
        console.log("New Firestore Connection");
        const connFirestoreOptions = {
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://asset-inventory-289612.firebaseio.com",
        };
        admin.initializeApp(connFirestoreOptions);
        if (admin.apps.length !== 0) {
            console.log("New Firestore Connection Successful");
        }
    } catch (error) {
        console.log("Firestore Connection Error! ...");
        console.log("Error : ", error);
    }
};

const getFirestoreDbObj = () => {
    try {
        if (admin.apps.length === 0) {
            connectFirestore();
        }
        db = admin.firestore();
        console.log("Returning Firestore DB Object ...");
        return db;
    } catch (error) {
        console.log("Error while returning Firestore DB Object ...");
        console.log("Error : ", error);
    }
};

const setValues = async () => {
    getFirestoreDbObj();
    try {
        // let docRef = db.doc("users/alovelace");
        // docRef.get().then(results => {
        //     console.log("Results : ", results.data());
        // });

        // docRef = docRef.collection("name");
        // results = await docRef.get();

        // results.forEach(doc => {
        //     console.log(doc.id, "--> Data -->", doc.data());
        // });

        let docRef = db.collection("users");
        const snapshot = await docRef.where("born", "==", 1815).limit(1).get();

        console.log("Users Collection : ", snapshot.empty);
    } catch (error) {
        console.log(error);
    }
};

// setValues();

module.exports = { getFirestoreDbObj };
