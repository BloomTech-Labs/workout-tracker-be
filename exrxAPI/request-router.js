const express = require('express');
const request = require('request');

const router = express.Router();

let bearer

router.post("/", async(req, res) => {

    const { search } = req.body

    if (search) {
        const tokenRequest = await request.post('http://204.235.60.194/consumer/login', {form:{username: process.env.EXRX_USERNAME, password: process.env.EXRX_PASSWORD}}, function(err, httpResponse, body) {
            bearer = JSON.parse(body);
        })

        await new Promise((resolve, reject) => setTimeout(resolve, 3000));
        const test = await console.log(JSON.stringify(bearer.token));
        
        const searchRequest = req.body.search;

        const getURL = {
            url: Number(searchRequest) ? `http://204.235.60.194/exrxapi/v1/allinclusive/exercises?exerciseids=[${searchRequest}]` : `http://204.235.60.194/exrxapi/v1/allinclusive/exercises?exercisename=${searchRequest}`,
            headers: {
                "Content-type": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13",
                "Connection": "keep-alive",
                "Accept": "*/*",
                "accept-encoding": "gzip, deflate",
                "Authorization": "Bearer " + bearer.token
            }
        }

        function callback(error, response, body) {
            console.log(error);
            console.log(response.statusCode);
            console.log(body);
            res.send(body);
        }

        const getRequest = await request(getURL, callback);
    } else {
        res.status(400).json({
            message: "missing a search parameter"
        })
    }
});

module.exports = router;