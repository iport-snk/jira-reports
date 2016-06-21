Ext.apply(window.MOCK_DATA, {
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
                    xtype: 'docpicker',
                    uri: '/directory/products',
                    displayField: 'task',
                    name: 'requiredProduct',
                    fieldLabel: 'Product'
                },{
                    xtype: 'docpicker',
                    uri: '/directory/customers',
                    displayField: 'name',
                    fieldLabel: 'Debtor',
                    name: 'debtor'
                }],
                grid: [{
                    dataIndex: 'product.task',
                    header: 'Product',
                    editor: {
                        field: {
                            xtype: 'docpicker',
                            uri: '/directory/products',
                            displayField: 'task'
                        }

                    },
                    flex: 1
                },{
                    header: 'Done',
                    dataIndex: 'resolutiondate',
                    formatter: 'date("d.m.Y")',
                    editor: {
                        xtype: 'datefield'
                    },
                    flex: 1
                },{
                    header: '... not yet',
                    dataIndex: 'resolution'
                }]
            },
            data: {
                info: {
                    name: "Инвойс",
                    date: "2016-01-01 20:00:20",
                    num: "I-01"
                },
                form: {
                    requiredProduct: {"id": 13, "task": "Reattach screen door"},
                    debtor: {id: 3, name: 'Tony Montana'}
                },
                grid: [
                    {resolutiondate: '2016-01-01 00:00:00', resolution: 'fixed', product: {"id": 12, "task": "Fix lights"}},
                    {resolutiondate: '2016-01-02 00:00:00', resolution: 'todo', product: {"id": 12, "task": "Fix lights"}},
                    {resolutiondate: '2016-01-03 00:00:00', resolution: 'rejected', product: {"id": 2, "task": "Kitchen supplies"}},
                    {resolutiondate: '2016-02-01 00:00:00', resolution: 'pending', product: {"id": 2, "task": "Kitchen supplies"}}
                ]

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
                info: {
                    name: "Инвойс",
                    date: "2016-01-02 10:11:00",
                    num: "I-02"
                },
                form: {
                    description: 'another ',
                    assignee: 'botsvin d.'
                },
                grid: [
                    {resolutiondate: '2016-01-01 00:00:00', resolution: 'fixed', product: {"id": 18, "task": "Chrome"}},
                    {resolutiondate: '2016-01-02 00:00:00', resolution: 'todo', product: {"id": 18, "task": "Chrome"}},
                    {resolutiondate: '2016-01-03 00:00:00', resolution: 'rejected', product: {"id": 18, "task": "Chrome"}},
                    {resolutiondate: '2016-02-01 00:00:00', resolution: 'pending', product: {"id": 18, "task": "Chrome"}}
                ]
            }

        }
    },
    '/registry/invoices': {
        type: 'json',  // use JsonSimlet (type is like xtype for components)
        data: {
            uri: '/registry/invoices',
            schema: {
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
                // document types this registry is collecting
                types: [{
                    name: "Инвойс",
                    uri: "/document/invoice"
                },{
                    name: "Оплата",
                    uri: "/document/payment"
                }],
                grid: [
                    {resolutiondate: '2016-01-01 00:00:00', resolution: 'fixed', documentId: '/document/invoice/1'},
                    {resolutiondate: '2016-01-02 00:00:00', resolution: 'todo', documentId: '/document/invoice/2'},
                    {resolutiondate: '2016-01-03 00:00:00', resolution: 'rejected', documentId: '/document/invoice/3'},
                    {resolutiondate: '2016-02-01 00:00:00', resolution: 'pending', documentId: '/document/invoice/4'}
                ]

            }
        }
    }
});
