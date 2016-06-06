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
                    xtype: 'directoryfield',
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
    },
    '/directory/products': {
        type: 'json',  // use JsonSimlet (type is like xtype for components)
        data: {
            "text": ".",
            "children": [
                {
                    "task": "Project: Shopping",
                    "duration": 13.25,
                    "user": "Tommy Maintz",
                    "iconCls": "tree-grid-task-folder",
                    "expanded": true,
                    "children": [
                        {
                            "task": "Housewares",
                            "duration": 1.25,
                            "user": "Tommy Maintz",
                            "iconCls": "tree-grid-task-folder",
                            "children": [
                                {
                                    "task": "Kitchen supplies",
                                    "duration": 0.25,
                                    "user": "Tommy Maintz",
                                    "leaf": true,
                                    "iconCls": "tree-grid-task"
                                }, {
                                    "task": "Groceries",
                                    "duration": .4,
                                    "user": "Tommy Maintz",
                                    "leaf": true,
                                    "iconCls": "tree-grid-task",
                                    "done": true
                                }, {
                                    "task": "Cleaning supplies",
                                    "duration": .4,
                                    "user": "Tommy Maintz",
                                    "leaf": true,
                                    "iconCls": "tree-grid-task"
                                }, {
                                    "task": "Office supplies",
                                    "duration": .2,
                                    "user": "Tommy Maintz",
                                    "leaf": true,
                                    "iconCls": "tree-grid-task"
                                }
                            ]
                        }, {
                            "task": "Remodeling",
                            "duration": 12,
                            "user": "Tommy Maintz",
                            "iconCls": "tree-grid-task-folder",
                            "expanded": true,
                            "children": [
                                {
                                    "task": "Retile kitchen",
                                    "duration": 6.5,
                                    "user": "Tommy Maintz",
                                    "leaf": true,
                                    "iconCls": "tree-grid-task"
                                }, {
                                    "task": "Paint bedroom",
                                    "duration": 2.75,
                                    "user": "Tommy Maintz",
                                    "iconCls": "tree-grid-task-folder",
                                    "children": [
                                        {
                                            "task": "Ceiling",
                                            "duration": 1.25,
                                            "user": "Tommy Maintz",
                                            "iconCls": "tree-grid-task",
                                            "leaf": true
                                        }, {
                                            "task": "Walls",
                                            "duration": 1.5,
                                            "user": "Tommy Maintz",
                                            "iconCls": "tree-grid-task",
                                            "leaf": true
                                        }
                                    ]
                                }, {
                                    "task": "Decorate living room",
                                    "duration": 2.75,
                                    "user": "Tommy Maintz",
                                    "leaf": true,
                                    "iconCls": "tree-grid-task",
                                    "done": true
                                }, {
                                    "task": "Fix lights",
                                    "duration": .75,
                                    "user": "Tommy Maintz",
                                    "leaf": true,
                                    "iconCls": "tree-grid-task",
                                    "done": true
                                }, {
                                    "task": "Reattach screen door",
                                    "duration": 2,
                                    "user": "Tommy Maintz",
                                    "leaf": true,
                                    "iconCls": "tree-grid-task"
                                }
                            ]
                        }
                    ]
                }, {
                    "task": "Project: Testing",
                    "duration": 2,
                    "user": "Core Team",
                    "iconCls": "tree-grid-task-folder",
                    "children": [
                        {
                            "task": "Mac OSX",
                            "duration": 0.75,
                            "user": "Tommy Maintz",
                            "iconCls": "tree-grid-task-folder",
                            "children": [
                                {
                                    "task": "FireFox",
                                    "duration": 0.25,
                                    "user": "Tommy Maintz",
                                    "iconCls": "tree-grid-task",
                                    "leaf": true
                                }, {
                                    "task": "Safari",
                                    "duration": 0.25,
                                    "user": "Tommy Maintz",
                                    "iconCls": "tree-grid-task",
                                    "leaf": true
                                }, {
                                    "task": "Chrome",
                                    "duration": 0.25,
                                    "user": "Tommy Maintz",
                                    "iconCls": "tree-grid-task",
                                    "leaf": true
                                }
                            ]
                        }, {
                            "task": "Windows",
                            "duration": 3.75,
                            "user": "Darrell Meyer",
                            "iconCls": "tree-grid-task-folder",
                            "children": [
                                {
                                    "task": "FireFox",
                                    "duration": 0.25,
                                    "user": "Darrell Meyer",
                                    "iconCls": "tree-grid-task",
                                    "leaf": true
                                }, {
                                    "task": "Safari",
                                    "duration": 0.25,
                                    "user": "Darrell Meyer",
                                    "iconCls": "tree-grid-task",
                                    "leaf": true
                                }, {
                                    "task": "Chrome",
                                    "duration": 0.25,
                                    "user": "Darrell Meyer",
                                    "iconCls": "tree-grid-task",
                                    "leaf": true
                                }, {
                                    "task": "Internet Explorer",
                                    "duration": 3,
                                    "user": "Darrell Meyer",
                                    "iconCls": "tree-grid-task",
                                    "leaf": true
                                }
                            ]
                        }, {
                            "task": "Linux",
                            "duration": 0.5,
                            "user": "Aaron Conran",
                            "iconCls": "tree-grid-task-folder",
                            "children": [
                                {
                                    "task": "FireFox",
                                    "duration": 0.25,
                                    "user": "Aaron Conran",
                                    "iconCls": "tree-grid-task",
                                    "leaf": true
                                }, {
                                    "task": "Chrome",
                                    "duration": 0.25,
                                    "user": "Aaron Conran",
                                    "iconCls": "tree-grid-task",
                                    "leaf": true
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
};
