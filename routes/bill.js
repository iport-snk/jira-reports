var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var u = require('util');

var nodeExcel = require('excel-export');

var poolBill  = mysql.createPool({
    host     : 'stat.fun.co.ua',
    user     : 'oleg',
    password : 'mutabor',
    database: 'bill'
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/payments', function(req, res, next) {
    var reportType = req.query['reportType'] || 'json';
    poolBill.query(
        'call get_payments(?, ?)',
        [req.query.period, req.query.paymentTypes],
        function(err, recordset, fields){
            var dataset = {
                records: recordset[0],
                byPaymentType: recordset[1],
                byProvider: recordset[2]
            };
            if (reportType == 'excel') {
                var conf = prepareConf(req.query.name, dataset.records),
                    result = nodeExcel.execute(conf);
                res.setHeader('Content-Type', 'application/vnd.openxmlformats');
                res.setHeader("Content-Disposition", "attachment; filename=" + conf.name + ".xlsx");
                res.end(result, 'binary');
            } else {
                res.json(dataset);
            }

        }
    )
});

function prepareConf(name, records){
    var conf = {
        name: name,
        cols: [
            {caption: 'Дата'},
            {caption: 'Коментарий',type: 'string'},
            {caption: 'Договор',type: 'string'},
            {caption: 'Провайдер',type: 'string'},
            {caption: 'Сумма',type: 'number'},
            {caption: 'Способ',type: 'string'}
        ],
        rows: []
    };
    records.forEach(function(record){
        conf.rows.push([
            record.payment_date.toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            record.reason,
            record.contract,
            record.provider_name,
            record.cash,
            record.payment_type
        ])
    });
    return conf;
}

router.get('/periods', function(req, res, next) {
    var q = "SELECT DATE_FORMAT(NOW(), '%Y-%m') as period  ";
    for (i=1; i<12; i++) {
        q += u.format(" UNION select DATE_FORMAT((NOW() - INTERVAL %s month), '%%Y-%%m') as period", i);
    }
    poolBill.query(q, function(err, rows, fields){
        res.json(rows);
    })
});

router.post('/excel', function(req, res){
    var conf = JSON.parse(req.body.content);
    //conf.stylesXmlFile = "styles.xml";
    var result = nodeExcel.execute(conf);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename=" + conf.name + ".xlsx");
    res.end(result, 'binary');
});


router.get('/excel', function(req, res){
    var conf ={};
    conf.stylesXmlFile = "styles.xml";
    conf.name = "mysheet";
    conf.cols = [{
        caption:'ttt',
        type:'string',
        width:'1.80'
    },{
        caption:'jjj',
        type:'date',
        width:'18'

    },{
        caption:'bool',
        type:'bool',
        width:'180'
    },{
        caption:'number',
        type:'number',
        width:'380'
    }];
    conf.rows = [
        ['pi', new Date(Date.UTC(2013, 4, 1)), true, 3.14],
        ["e", new Date(2012, 4, 1), false, 2.7182]
    ];
    var result = nodeExcel.execute(conf);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
    res.end(result, 'binary');
});






module.exports = router;
