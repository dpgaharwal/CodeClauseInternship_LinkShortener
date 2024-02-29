const shortid = require("shortid");
const URL = require('../models/url');
async function GenerateShortURL(req, res){
    const body = req.body;
    if(!body.url) return res.status(400).json({ error: 'url is required'});

    const existingURL = await URL.findOne({ redirectURL: body.url });
    if (existingURL) {
        return res.json({ id: existingURL.shortId });
    }

    const shortID = shortid(8);
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        history: [],
    });
    return res.json({id: shortID});
}

async function handleGetAnalytics(req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({totalClicks: result.history.length, analytics:result.history,})
}

module.exports = {
    GenerateShortURL, handleGetAnalytics,
}