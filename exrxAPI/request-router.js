const express = require('express');
const request = require('request');

const router = express.Router();

let bearer

router.post("/", async(req, res) => {
    try {
        const { search } = req.body

        if (search) {
            await new Promise(function(resolve, reject) {
                request.post('http://204.235.60.194/consumer/login', {form:{username: process.env.EXRX_USERNAME, password: process.env.EXRX_PASSWORD}}, function(err, body) {
                bearer = JSON.parse(body);
                    if (err) {
                        reject(err);
                    } else {
                        resolve(bearer)
                    }
                })
            })
            
            const searchRequest = req.body.search;

            const getURL = {
                url: Number(searchRequest[0]) ? `http://204.235.60.194/exrxapi/v1/allinclusive/exercises?exerciseids=[${searchRequest}]` : `http://204.235.60.194/exrxapi/v1/allinclusive/exercises?exercisename=${searchRequest}`,
                headers: {
                    "Content-type": "application/json",
                    "User-Agent": process.env.EXRX_USER_AGENT,
                    "Connection": "keep-alive",
                    "Accept": "*/*",
                    "accept-encoding": "gzip, deflate",
                    "Authorization": "Bearer " + bearer.token
                }
            }
            console.log(getURL)
            function callback(error, response, body) {
                body = JSON.parse(body)
            
                if (error) {
                    res.status(response.statusCode).json({
                        message: error
                    })
                } else if (body.success == false) {
                    res.status(401).json({
                        message: body.message
                    });
                } else {
                    res.send(body);
                    console.log(body)
                }
            }

            const getRequest = await request(getURL, callback);
        } else {
            res.status(400).json({
                message: "missing a search parameter"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Failed to get exercises"
        })
    }
});

module.exports = router;