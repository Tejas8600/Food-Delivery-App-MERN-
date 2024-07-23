

const express = require('express')
const router = express.Router()
const user = require('../models/User')
const { body, validationResult } = require('express-validator');

const jwt= require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const jwtSecret="Mynameistejaspurifrompune"


// 1- CREATING USER
router.post("/createuser",
    [
        body('email', 'Incorrect Email').isEmail(),
        body('name').isLength({ min: 5 }),
        body('password', 'Incorrect Password').isLength({ min: 5 })
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const salt=await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password,salt)


        try {
            await user.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true })
        } catch (error) {
            console.log(error)
            res.json({ success: false })

        }

    })

// 2- USER LOGGING
router.post("/loginuser",
    [
        body('email', 'Incorrect Email').isEmail(),

        body('password', 'Incorrect Password').isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email;

        try {
            let userData = await user.findOne({ email });
            if (!userData) {
                return res.status(400).json({ error: "User not found" })
            }

            const pwdCompare=await bcrypt.compare(req.body.password,userData.password)

            if (!pwdCompare) {
                return res.status(400).json({ error: "Incorrect Password" })

            }

            const data={
                user:{
                    id:userData.id
                }
            }
            const authToken=jwt.sign(data,jwtSecret)
            return res.json({ success: true, authToken:authToken })

        } catch (error) {
            console.log(error)
            res.json({ success: false })

        }

    })

//     // Get location
// router.post('/getlocation', async (req, res) => {
//     try {
//         let lat = req.body.latlong.lat;
//         let long = req.body.latlong.long;
//         console.log(lat, long);
//         let location = await axios
//             .get("https://api.opencagedata.com/geocode/v1/json?q=" + lat + "+" + long + "&key=74c89b3be64946ac96d777d08b878d43")
//             .then(async res => {
//                 console.log(res.data.results);
//                 let response = res.data.results[0].components;
//                 let { village, county, state_district, state, postcode } = response;
//                 return String(village + "," + county + "," + state_district + "," + state + "\n" + postcode);
//             })
//             .catch(error => {
//                 console.error(error);
//             });
//         res.send({ location });
//     } catch (error) {
//         console.error(error.message);
//         res.send("Server Error");
//     }
// });

// module.exports = router;

// module.exports = router;