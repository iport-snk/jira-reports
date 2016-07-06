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
    req.pool.query("select employee as id, concat(employee, ' - ', employee_type) as name, employee_type as type from get_workers",
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

router.get('/employee', function(req, res, next) {
    req.pool.query(
        'select * from employee',
        function(err, recordset, fields){
            res.json(recordset);
        }
    );
});

router.post('/employee', function(req, res, next) {
    var sql = '';

    if (req.body.removed.length > 0) {
        sql += req.body.removed.map(function(item){
            return 'delete from employee where id = ' + item.id;
        }).join(';') + ';';
    };
    if (req.body.records.length > 0) {
        sql += 'insert into employee (first_name, last_name, active, jira_code) values ' +
            req.body.records.map(function(item){
                return "('" + item.first_name + "','" + item.last_name + "'," + item.active + ",'" + item.jira_code + "')";
            }).join(',') +
            ' on duplicate key update ' +
            ' first_name = values(first_name), last_name = values(last_name), active = values(active)';
    }

    req.pool.query(
        sql,
        function(err, recordset, fields){
            res.json(recordset);
        }

    );
});

router.get('/salary-report', function(req, res, next) {
    var employee = req.query['employee'],
        employeeType = req.query['employeeType'],
        calcWork = function(r){
            var connectionRate = {master: 70, worker: 70, assistant: 50},
                rateMeter = {master: 0.50, worker: 0.50, assistant: 0.25},
                hourRate = {master: 45, worker: 31.5, assistant: 0};

            r.workHrs = r.workCbl = r.workConn = 0;

            if (r.issuetype == 10102 || r.issuetype == 10101) {
                //Магистраль
                r.estimate = r.original_estimate / 60;
                r.work = r.workCbl = r.time_spent / 60;
                r.unit = 'm';
                r.rate = rateMeter[r.employee_type];
                r.cost = r.work * r.rate;
            } else if (r.issuetype == 10100) {
                // Подключение
                r.work = r.workConn = r.estimate = 1;
                r.unit = 'шт.';
                r.cost = r.rate = connectionRate[r.employee_type];
            } else {
                // Почасовка
                r.work = r.workHrs = r.time_spent / 3600;
                r.estimate = r.original_estimate / 3600;
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
