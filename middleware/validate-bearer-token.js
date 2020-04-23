
const APIKEY = "2abbf7c3-245b-404f-9473-ade729ed4653";

function validateKey(req, res, next) {
    if (!req.headers.authorization) {
        res.statusMessage = "missing API KEY";
        return res.status(401).end();
    }

    if (req.headers.authorization !== `Bearer ${APIKEY}`) {
        res.statusMessage = "invalid api key";
        return res.status(401).end();
    }
    next();
}

module.exports = validateKey;