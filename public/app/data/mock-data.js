Ext.apply(window.MOCK_DATA, {
    '/workers': {
        type: 'json',
        data: [
            { employee: 'db',  employee_type: 'worker' },
            { employee: 'ak',  employee_type: 'worker' }
        ]
    },
    '/cash': {
        type: 'json',
        data: [
            { date: '2016-02-03T00:00:00+02:00', reason: 'aaa1', amount: 50 },
            { date: '2016-02-03T00:00:00+02:00', reason: 'aaa2', amount: -20 },
            { date: '2016-02-03T00:00:00+02:00', reason: 'aaa3', amount: 30 },
            { date: '2016-02-03T00:00:00+02:00', reason: 'bbb', amount: -20 }
        ]
    }
});
