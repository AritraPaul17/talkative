const User = require("../../database/models/usermodel");
const bcryptjs = require('bcryptjs');
const generateToken = require("../../helpers/token");
const Friend = require("../../database/models/friendsModel");

const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(401).send({
                success: false,
                message: "Please fill all the field."
            })
        }
        if (username.length < 3) {
            return res.status(401).send({
                success: false,
                message: "Username length should be more than 3."
            })
        }
        if (password.length < 4) {
            return res.status(401).send({
                success: false,
                message: "Password length should be more than 4."
            })
        }
        const sameEmailUser = await User.findOne({ email });
        if (sameEmailUser) {
            return res.status(401).send({
                success: false,
                message: "Email is already in use.",
            })
        }
        const sameNameUser = await User.findOne({ username });
        if (sameNameUser) {
            return res.status(401).send({
                success: false,
                message: "Username already exists.",
            })
        }
        //hashing password
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashPassword,
            profilepic: 0
        })

        if (newUser) {
            const token = generateToken(newUser._id, res);
            const data = await newUser.save();
            let friends = new Friend({
                userId: data._id,
            })
            friends = await friends.save();
            return res.status(201).send(
                {
                    success: true,
                    message: "successfully registered.",
                    data,
                    authtoken:token
                }
            )
        }
        else {
            return res.status(501).send({
                success: false,
                message: "Some internal error occured.",
            })
        }
    }
    catch (err) {
        return res.status(501).send({
            success: false,
            message: err.message,
            data: err
        })
    }

}

module.exports = signup;