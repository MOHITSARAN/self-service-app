const express = require("express");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const user_controller = require("../../controllers/user/user_controller");

const router = express.Router();

// @route   POST api/<version>/user
// @desc    Create User
// @access  public route

router.post(
    "/",
    [
        check("name", "I hope you have a name").not().isEmpty(),
        check(
            "email",
            "We are familiar with email syntax, aren't we?"
        ).isEmail(),
        check(
            "password",
            "Hey, lets enter a more secure passsword, 6 characters or more"
        ).isLength({ min: 6 }),
        check("windowsId", "Everyone is gotta have a Windows Id")
            .not()
            .isEmpty(),
        check("phoneNumber", "No Phone Number eh?").isNumeric().isLength(10),
        check(
            "isAdmin",
            "You have to be either an admin or not!! you cannot be something else :)"
        ).isBoolean(),
        check("timeZone", "Everyone on earth should have a timezone!")
            .not()
            .isEmpty(),
    ],
    async (req, res) => {
        // Validate the user input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Create User Controller
        const result = await user_controller.createUser(req.body);

        // Understanding the reponse and sending back the data.
        if (result.token != undefined) {
            return res.status(result.status).json({
                token: result.token,
            });
        } else {
            return res.status(result.status).json({
                message: result.message,
            });
        }
    }
);

// @route GET api/<version>/user
// @desc  get user details
// @access  private route

router.get("/", auth, async (req, res) => {
    // Get User Details Controller
    const result = await user_controller.getUserDetails(req.user);

    // Understanding the reponse and sending back the data.
    if (result.userDetails != undefined) {
        return res.status(result.status).json({
            userDetails: result.userDetails,
        });
    } else {
        return res.status(result.status).json({
            message: result.message,
        });
    }
});

// @route POST api/<version>/user/toggleDarkState
// @desc  Toggle Dark State
// @access  private route

router.get("/toggledarkstate", auth, async (req, res) => {
    // Toggle User Dark State Controller
    const result = await user_controller.toggleUserDarkState(req.user);
    return res.status(result.status).json({
        message: result.message,
    });
});

module.exports = router;
