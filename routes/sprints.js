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
        'select * from get_employee',
        function(err, recordset, fields){
            res.json(recordset);
        }
    );
});

router.post('/payment', function(req, res, next) {
    var doc = req.body,
        sql = 'set @doc := ?; set @empl := ?; set @date := ?; set @amount := ?; set @comment := ?;' +
            'insert into salary (date, employer, amount, comment, id) values (@date, @empl, @amount, @comment, @doc) ' +
            'on duplicate key update date=values(date), employer=values(employer), amount=values(amount), comment=values(comment);' +
            (doc.id == 0 ?
            'set @doc := LAST_INSERT_ID();' :
            'delete from salary_details where salary_id = @doc;') +
            'insert into salary_details (salary_id, sprint, employer) values ' +
            doc.sprints.map(function(sprint){
                return "(@doc, " + sprint +", @empl)"
            }).join(',') + ";select @doc as id;";

    req.pool.query(
        sql,
        [doc.id, doc.employer, doc.date, doc.amount, doc.comment],
        function(err, recordset, fields){
            recordset.forEach(function(item){
                if (Array.isArray(item)) res.json(item[0]);
            })

        }
    );


});
router.put('/payment', function(req, res, next) {
    debugger;
});
router.delete('/payment/:doc', function(req, res, next) {
    req.pool.query(
        'set @doc_id := ?;' +
        'delete from salary_details where salary_id = @doc_id;' +
        'delete from salary where id = @doc_id;',
        [req.params.doc],
        function(err, recordset, fields){
            res.json(recordset);
        }
    );
});
module.exports = router;