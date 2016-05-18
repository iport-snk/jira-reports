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
    var employee = req.query['employee'],
        employeeType = req.query['employeeType'],
        calcWork = function(r){
            var connectionRate = {master: 70, worker: 70, assistant: 50},
                rateMeter = 0.75,
                hourRate = {master: 45, worker: 31.5, assistant: 0};

            if (r.issuetype == 10102 || r.issuetype == 10101) {
                //Магистраль
                r.work = r.time_spent / 60;
                r.unit = 'm';
                r.rate = rateMeter;
                r.cost = r.work * rateMeter;
            } else if (r.issuetype == 10100) {
                // Подключение
                r.work = 1;
                r.unit = 'шт.';
                r.cost = r.rate = connectionRate[r.employee_type];
            } else {
                // Почасовка
                r.work = r.time_spent / 3600;
                r.unit = 'h';
                r.rate = hourRate[r.employee_type];
                r.cost = r.work * r.rate;
            }
        };
    req.pool.query(
        'call get_salary_report(?, ?)',
        [employee, employeeType],
        function(err, recordset, fields){
            var records = recordset[0];
            records.forEach(function(record){
                calcWork(record);
            });
            res.json(records);
        }
    )
});



module.exports = router;
