var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        list: [
            {
                date: '030319',
                name: 'm.JPG'
            },
            {
                date: '030319',
                name: 'm.JPG'
            },
            {
                date: '030319',
                name: 'm.JPG'
            },
            {
                date: '030319',
                name: 'm.JPG'
            },
            {
                date: '030319',
                name: 'm.JPG'
            },
            {
                date: '030319',
                name: 'm.JPG'
            },
            {
                date: '030319',
                name: 'm.JPG'
            }
        ]
    });
});

router.get('/index.html', function(req, res, next) {
    res.render('index', {
        list: []
    });
});
module.exports = router;
