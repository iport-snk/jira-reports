window.MOCK_DATA = {
    '/workers': {
        type: 'json',  // use JsonSimlet (type is like xtype for components)
        data: [
            { employee: 'db',  employee_type: 'worker' },
            { employee: 'ak',  employee_type: 'worker' }
        ]
    },
    '/document/invoice/1': {
        type: 'json',  // use JsonSimlet (type is like xtype for components)
        data: {
            schema: {
                form: [{
                    xtype: 'textfield',
                    name: 'description',
                    fieldLabel: 'Description'
                },{
                    xtype: 'combo',
                    name: 'assignee',
                    fieldLabel: 'Assignee'
                }],
                grid: [{
                    header: 'Done',
                    dataIndex: 'resolutiondate',
                    formatter: 'date("d.m.Y")',
                    flex: 1
                },{
                    header: '... not yet',
                    dataIndex: 'resolution'
                }]
            },
            data: {
                form: {
                    description: 'install switches at building #1',
                    assignee: 'bakaev d.'
                },
                grid: {
                    rows: [
                        {resolutiondate: '2016-01-01 00:00:00', resolution: 'fixed'},
                        {resolutiondate: '2016-01-02 00:00:00', resolution: 'todo'},
                        {resolutiondate: '2016-01-03 00:00:00', resolution: 'rejected'},
                        {resolutiondate: '2016-02-01 00:00:00', resolution: 'pending'}
                    ]
                }
            }

        }
    },
    '/document/invoice/2': {
        type: 'json',  // use JsonSimlet (type is like xtype for components)
        data: {
            schema: {
                form: [{
                    xtype: 'textfield',
                    name: 'description',
                    fieldLabel: 'Description'
                },{
                    xtype: 'combo',
                    name: 'assignee',
                    fieldLabel: 'Assignee'
                }],
                grid: [{
                    header: 'Done',
                    dataIndex: 'resolutiondate',
                    formatter: 'date("d.m.Y")',
                    flex: 1
                },{
                    header: '... not yet',
                    dataIndex: 'resolution'
                }]
            },
            data: {
                form: {
                    description: 'another ',
                    assignee: 'botsvin d.'
                },
                grid: {
                    rows: [
                        {resolutiondate: '2016-01-01 00:00:00', resolution: 'fixed'},
                        {resolutiondate: '2016-01-02 00:00:00', resolution: 'todo'},
                        {resolutiondate: '2016-01-03 00:00:00', resolution: 'rejected'},
                        {resolutiondate: '2016-02-01 00:00:00', resolution: 'pending'}
                    ]
                }
            }

        }
    },
    '/registry/invoices': {
        type: 'json',  // use JsonSimlet (type is like xtype for components)
        data: {
            schema: {
                form: [],
                grid: [{
                    header: 'Done',
                    dataIndex: 'resolutiondate',
                    formatter: 'date("d.m.Y")',
                    flex: 1
                },{
                    header: '... not yet',
                    dataIndex: 'resolution'
                },{
                    dataIndex: 'documentId'
                }]
            },
            data: {
                form: {},
                grid: {
                    rows: [
                        {resolutiondate: '2016-01-01 00:00:00', resolution: 'fixed', documentId: '/document/invoice/1'},
                        {resolutiondate: '2016-01-02 00:00:00', resolution: 'todo', documentId: '/document/invoice/2'},
                        {resolutiondate: '2016-01-03 00:00:00', resolution: 'rejected', documentId: '/document/invoice/3'},
                        {resolutiondate: '2016-02-01 00:00:00', resolution: 'pending', documentId: '/document/invoice/4'}
                    ]
                }
            }
        }
    }
};
