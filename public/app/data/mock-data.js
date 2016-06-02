window.MOCK_DATA = {
    '/workers': {
        type: 'json',  // use JsonSimlet (type is like xtype for components)
        data: [
            { employee: 'db',  employee_type: 'worker' },
            { employee: 'ak',  employee_type: 'worker' }
        ]
    },
    '/document/1': {
        type: 'json',  // use JsonSimlet (type is like xtype for components)
        data: {
            form: {
                description: 'install switches at building #1',
                assignee: 'bakaev d.'
            },
            rows: [
                {resolutiondate: '2016-01-01 00:00:00', resolution: 'fixed'},
                {resolutiondate: '2016-01-02 00:00:00', resolution: 'todo'},
                {resolutiondate: '2016-01-03 00:00:00', resolution: 'rejected'},
                {resolutiondate: '2016-02-01 00:00:00', resolution: 'pending'}
            ]
        }
    }
};
