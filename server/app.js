/**
 * Server application - contains all server config and api endpoints
 *
 * @author Pim Meijer
 */
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const db = require("./utils/databaseHelper");
const corsConfig = require("./utils/corsConfigHelper");
const app = express();

//logger lib  - 'short' is basic logging info
app.use(morgan("short"));

//init mysql connectionpool
const connectionPool = db.init();

connectionPool.getConnection((err, conn) => {
    if (err) {
        console.log(err);
        console.log(`${err.errno} ${err.code}: ${err.sqlMessage}`);
    } else {
        connectionPool.query("SELECT word FROM ongepastwoord", function (err, result_inappropriate_word) {
            app.post("/chatbotOngepast", (req, res) => {
                res.send(Object.values(JSON.parse(JSON.stringify(result_inappropriate_word))));
            });
        });
        conn.release();
    }
});

connectionPool.getConnection((err, conn) => {
    if (err) {
        console.log(err);
        console.log(`${err.errno} ${err.code}: ${err.sqlMessage}`);
    } else {
        connectionPool.query("SELECT word FROM keyword WHERE endpoint = '/search'", function (err, search) {
            app.post("/chatbotSearch", (req, res) => {
                res.send(Object.values(JSON.parse(JSON.stringify(search))));
            });
        });
        conn.release();
    }
});

connectionPool.getConnection((err, conn) => {
    if (err) {
        console.log(err);
        console.log(`${err.errno} ${err.code}: ${err.sqlMessage}`);
    } else {
        connectionPool.query("SELECT word FROM keyword WHERE endpoint = '/holdings'", function (err, holdings) {
            app.post("/chatbotHoldings", (req, res) => {
                res.send(Object.values(JSON.parse(JSON.stringify(holdings))));
            });
        });
        conn.release();
    }
});

//parsing request bodies from json to javascript objects
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CORS config - Cross Origin Requests
app.use(corsConfig);

// ------ ROUTES - add all api endpoints here ------
const httpOkCode = 200;
const badRequestCode = 400;

const https = require("https");
const obaPublicKey = "1e19898c87464e239192c8bfe422f280";
const obaSecret = "4289fec4e962a33118340c888699438d";

app.post("/search", (req, res) => {
    const url = `https://zoeken.oba.nl/api/v1/search/?q=${req.body.message}&authorization=${obaPublicKey}&refine=true&output=json`;
    const request = https.get(url, {
        timeout: 10000,
        headers: {
            "AquaBrowser": obaSecret,
            "Content-Type": "application/json; charset=utf-8;"
        },
    }, (obaResponse) => {
        let bodyChunks = [];
        obaResponse.on('data', (chunk) => {
            bodyChunks.push(chunk);
        }).on("end", () => {
            const json = Buffer.concat(bodyChunks).toString();
            res.status(httpOkCode).send(json);
        })
    });

    request.on("error", err => {
        res.status(badRequestCode).json({reason: err})
    });

    request.end();
});

app.post("/holdings", (req, res) => {
    const url = `https://zoeken.oba.nl/api/v1/holdings/oba/?authorization=${obaPublicKey}&output=json`;
    const request = https.get(url, {
        timeout: 10000,
        headers: {
            "AquaBrowser": obaSecret,
            "Content-Type": "application/json; charset=utf-8;"
        },
    }, (obaResponse) => {
        let bodyChunks = [];
        obaResponse.on('data', (chunk) => {
            // process streamed parts here...
            bodyChunks.push(chunk);
        }).on("end", () => {
            // parse to array (in js)
            const json = Buffer.concat(bodyChunks).toString();

            res.status(httpOkCode).send(json);
        })
    });

    request.on("error", err => {
        res.status(badRequestCode).json({reason: err})
    });

    request.end();
});

// communiceren met de front end om een antwoord te kunnen krijgen
app.post("/chatbot", (req, res) => {
    // checks if the body is empty of the message
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(badRequestCode).json({reason: "No message was send"});
    }
    let message = req.body.message;

    res.send("Dit is een antwoord");
});

//------- END ROUTES -------

module.exports = app;