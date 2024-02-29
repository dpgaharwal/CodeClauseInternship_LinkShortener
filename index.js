const express = require('express');
const {connectToMongoDB} = require('../Link Shortener/connect');
const urlRoute = require("../Link Shortener/routes/url");
const URL = require("../Link Shortener/models/url");
const app = express();
const PORT = 8001;
app.use(express.static('public'));

connectToMongoDB('mongodb://localhost:27017/short-url').then(()=> console.log("MongoDB Connected"));
app.use(express.json());
app.use("/url", urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    try {
        // Find the document with the given shortId in the database
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { $push: { history: { time: Date.now() }}}
        );

        // If no document is found, send a 404 error
        if (!entry) {
            return res.status(404).send('Short URL not found');
        }

        // If a document is found, redirect to its 'redirectURL'
        res.redirect(entry.redirectURL);
    } catch (error) {
        // If an error occurs during the database operation, send a 500 error
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});




app.listen(PORT, ()=> console.log(`Server started at PORT: ${PORT}`));