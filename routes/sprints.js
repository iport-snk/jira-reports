var express = require('express');
var router = express.Router();

router.get('/',  function(req, res, next) {
    req.pool.query(
        'select id, name, start_date, end_date, complete_date from get_sprints where started = 1 and closed = 1',
        function(err, recordset, fields){
            res.json(recordset);
        }
    );
});
/* GET users listing. */
router.get('/due/:employer/:doc', function(req, res, next) {
    var employer = req.params.employer,
        docId = req.params.doc;
    // for a new payment doc return all pay due sprint
    // for existing document (editing) sprint list also should include ones previously set in case we will want to
    // change list of sprints covered by current document
    req.pool.query(
        'call get_due_pay_sprints(?, ?)',
        [employer, docId == 'null' ? null : docId],
        function(err, recordset, fields){
            res.json(recordset[0]);
        }
    );

    /*if (employer == 'ss') {
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
    }*/

});
router.get('/payed/:doc', function(req, res, next) {
    var docId = req.params.doc,
        now = new Date();

    req.pool.query(
        'select id, date, amount, employer, comment, select_salary_sprints(id) as sprints from salary where id = ?',
        [docId],
        function(err, recordset, fields){
            res.json(recordset);
        }
    );

    /*res.json({
        id: 1,
        date: '12.11.2015 12:20:20',
        employer: 'ss',
        amount: 5000,
        comment: 'джастификейшн',
        sprints: [0, 1, 2]

    })*/
});

router.get('/payed', function(req, res, next) {
    req.pool.query(
        'select s.id, s.date, s.amount, s.employer as employer, ' +
            'comment, select_salary_sprints(s.id) as sprints ' +
            '   from salary s', [],
        function(err, recordset, fields){
            recordset.forEach(function(item){
                item.sprints = JSON.parse(item.sprints);
            });
            res.json(recordset);
        }
    );
});

router.get('/employee', function(req, res, next) {
    req.pool.query(
        'select jira_code as id, concat(first_name, " ", last_name) as name from employee where active = 1',
        function(err, recordset, fields){
            res.json(recordset);
        }
    );
});

router.get('/payment', function(req, res, next) {

});
router.post('/payment', function(req, res, next) {
    var sprints = req.body.spints;
    req.pool.query(
        'delete salary_details where salary_id = ?;',
        [req.body.id],
        function(err, recordset, fields){
            res.json(recordset);
        }
    );
});
router.put('/payment', function(req, res, next) {
    debugger;
});
module.exports = router;