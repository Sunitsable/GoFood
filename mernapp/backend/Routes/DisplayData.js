const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res) => {
    try {
        const foodData = req.app.locals.foodData; // Access stored data from app locals
        res.send(foodData);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
