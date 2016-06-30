var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/due', function(req, res, next) {
    var employer = req.query['employer'];
    // for a new payment doc return all pay due sprint
    // for existing document (editing) sprint list also should include ones previously set in case we will want to
    // change list of sprints covered by current document
    var docId = req.query['doc'];

    if (employer == 'ss') {
        res.json([
            {id: 0, name: 'ss 17/06-21/06'},
            {id: 1, name: 'ss 21/06-27/06'},
            {id: 2, name: 'ss 28/06-03/07'},
            {id: 3, name: 'ss 04/06-11/07'},
            {id: 4, name: 'ss 12/06-19/07'}
        ])
    } else {
        res.json([
            {id: 0, name: '17/06-21/06'},
            {id: 1, name: '21/06-27/06'},
            {id: 2, name: '28/06-03/07'},
            {id: 3, name: '04/06-11/07'},
            {id: 4, name: '12/06-19/07'}
        ])
    }

});
router.get('/payed', function(req, res, next) {
    var docId = req.query['doc'],
        now = new Date();
    res.json({
        id: 1,
        date: '12.11.2015 12:20:20',
        employer: 'ss',
        amount: 5000,
        comment: 'джастификейшн',
        sprints: [0, 1, 2]

    })
});

router.get('/employee', function(req, res, next) {
    res.json([
        {id: 'ss', name: 'Сергей Шадура'},
        {id: 'pv', name: 'Виктор Прудкий'},
        {id: 'db', name: 'Дмитрий Бакаев'}
    ])
});

module.exports = router;