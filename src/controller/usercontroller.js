const bycrypt = require('bcrypt');
const jwtoken = require('jsonwebtoken');
const User = require('../models/User');
const checker = require('../helper/objectIdChecker');
const { findOneAndUpdate } = require('../models/User');

const phoneNoLength = 11;

const createUser = async (req, res) => {
    /*
        "name":"",
        "phoneNo":"",
        "password":""
    */
    const { name, phoneNo, password } = req.body;
    if (!name || !phoneNo || !password || phoneNo.length != phoneNoLength)
        return res.status(500).json({
            status: 'ERROR',
            message: 'You should Add in a correct format'
        })
    else {
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);
        await User.create({
            name,
            phoneNo,
            password: hashedPassword
        }, (err, doc) => {
            if (err)
                return res.status(303).json({
                    status: 'ERROR',
                    message: err,
                })
            else
                return res.status(200).json({
                    user: doc
                });
        })
    }
}


const getUser = async (req, res) => {
    /*
    {
        "userId":""
    }
    */

    const { userId } = req.params;
    if (!checker(userId)) {
        return res.status(303).json({
            status: 'ERROR',
            message: 'You should send right id',
        })
    }
    else {
        await User.findOne({ _id: userId }, (err, doc) => {
            if (err)
                return res.status(303).json({
                    status: 'ERROR',
                    message: err,
                })
            else
                return res.status(200).json({
                    user: doc
                });
        })
    }
}

const loginUser = async (req, res) => {
    /*
        {
            "phoneNo":"",
            "password":"",
        }
    */
    const { phoneNo, password } = req.body;
    if (!phoneNo || !password)
        return res.status(500).json({
            status: 'ERROR',
            message: 'You should Add in a correct format'
        })
    else {
        await User.findOne({ phoneNo }, async (err, doc) => {
            if (err)
                return res.status(303).json({
                    status: 'ERROR',
                    message: err,
                })
            else if (!doc) {
                return res.status(404).json({
                    status: 'ERROR',
                    message: 'User Not Found',
                })
            }
            else {
                const validPass = await bycrypt.compare(password, doc.password);

                if (!validPass) {
                    res.status(400).json({
                        status: 'ERROR',
                        message: 'Password is Wrong'
                    });
                }
                else {
                    const token = jwtoken.sign({ _id: doc._id }, process.env.JWTSECRET, { expiresIn: '1w' });
                    res.status(200).header("auth-token", token).json({
                        user: doc
                    });
                }
            }
        })
    }
}
const updateUserAddress = async (req, res) => {
    /*
        {
            "address" = ""
        }
    */
    const { address } = req.body;
    const { _id } = req.user;

    await User.findOneAndUpdate({ _id }, { address }, { new: true }, (err, doc) => {
        if (err)
            return res.status(303).json({
                status: 'ERROR',
                message: err,
            })
        else if (!doc) {
            return res.status(404).json({
                status: 'ERROR',
                message: 'User Not Found',
            })
        }
        else {
            res.status(200).json({
                user: doc
            });
        }
    })
}

module.exports = { createUser, getUser, loginUser,updateUserAddress }