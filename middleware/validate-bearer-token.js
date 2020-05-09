
const {API_KEY} = require('./../config');

function validateKey(req, res, next) {
    if (!req.headers.authorization) {
        res.statusMessage = "missing API KEY";
        return res.status(401).end();
    }

    if (req.headers.authorization !== `Bearer ${API_KEY}`) {
        res.statusMessage = "invalid api key";
        return res.status(401).end();
    }
    next();
}

module.exports = validateKey;