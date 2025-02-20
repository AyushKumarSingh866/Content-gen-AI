import express from 'express';
import URL from '../models/url.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const allurls = await URL.find({});
    return res.render('temp', {
        urls: allurls,
    });
});

router.get('/signup', (req, res) => {
    return res.render("signup");
});

export default router;
