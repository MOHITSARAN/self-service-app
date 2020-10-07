const express = require("express");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const auth_controller = require("../../controllers/user/auth_controller");

const router = express.Router();

// @route POST api/<version>/auth
// @desc  Login User
// @access  public route

router.post(
    "/",
    [
        check(
            "email",
            "We are familiar with email syntax, aren't we?"
        ).isEmail(),
        check(
            "password",
            "Hey, lets enter a more secure passsword, 6 characters or more"
        ).isLength({ min: 6 }),
    ],
    async (req, res) => {
        // Validate the user input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Login User Controller
        const result = await auth_controller.loginUser(req.body);

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

// @route GET api/<version>/auth
// @desc  validate user
// @access  private route

router.get("/", auth, async (req, res) => {
    return res.status(200).json({
        message: "User Validated",
    });
});

module.exports = router;
