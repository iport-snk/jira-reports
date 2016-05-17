var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/issues', function(req, res, next) {
    req.pool.query('select * from get_issues', function(err, rows, fields){
        res.json(rows);
    })
});

router.get('/labels', function(req, res, next) {
    req.pool.query('select * from get_labels', function(err, rows, fields){
        res.json(rows);
    })
});

router.get('/workers', function(req, res, next) {
    req.pool.query('' +
        'SELECT ASSIGNEE as employee, "worker" employee_type  FROM jiradb.jiraissue where project = 10000 and ASSIGNEE is not null group by ASSIGNEE ' +
        '   union ' +
        "select label as employee, 'assistant' as employee_type  from label where fieldid = 10100 group by label",
        function(err, rows, fields){
            res.json(rows);
        }
    )
});

router.get('/labels-to-issues', function(req, res, next) {
    req.pool.query('select id, fieldid, issue, label from label', function(err, rows, fields){
        res.json(rows);
    })
});

router.get('/salary-report', function(req, res, next) {
    var employee = req.query['employee'];
    var employeeType = req.query['employeeType'];
    req.pool.query(
        'call get_salary_report(?, ?)',
        [employee, employeeType],
        function(err, recordset, fields){
            res.json(recordset[0]);
        }
    )
});



module.exports = router;
