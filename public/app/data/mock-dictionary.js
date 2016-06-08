Ext.apply(window.MOCK_DATA, {
    '/directory/products': {
        type: 'json',  // use JsonSimlet (type is like xtype for components)
        data: {
            schema: {
                tree: [{
                    xtype: 'treecolumn',
                    text: 'Task',
                    flex: 2,
                    sortable: true,
                    dataIndex: 'task'
                }, {
                    text: 'Assigned To',
                    flex: 1,
                    dataIndex: 'user',
                    sortable: true
                }]
            },
            data: {
                tree: {
                    "text": ".",
                    "children": [{
                        "id": 0,
                        "task": "Project: Shopping",
                        "duration": 13.25,
                        "user": "Tommy Maintz",
                        "iconCls": "tree-grid-task-folder",
                        "expanded": true,
                        "children": [{
                            "id": 1,
                            "task": "Housewares",
                            "duration": 1.25,
                            "user": "Tommy Maintz",
                            "iconCls": "tree-grid-task-folder",
                            "children": [{
                                "id": 2,
                                "task": "Kitchen supplies",
                                "duration": 0.25,
                                "user": "Tommy Maintz",
                                "leaf": true,
                                "iconCls": "tree-grid-task"
                            }, {
                                "id": 3,
                                "task": "Groceries",
                                "duration": .4,
                                "user": "Tommy Maintz",
                                "leaf": true,
                                "iconCls": "tree-grid-task",
                                "done": true
                            }, {
                                "id": 4,
                                "task": "Cleaning supplies",
                                "duration": .4,
                                "user": "Tommy Maintz",
                                "leaf": true,
                                "iconCls": "tree-grid-task"
                            }, {
                                "id": 5,
                                "task": "Office supplies",
                                "duration": .2,
                                "user": "Tommy Maintz",
                                "leaf": true,
                                "iconCls": "tree-grid-task"
                            }]
                        }, {
                            "id": 6,
                            "task": "Remodeling",
                            "duration": 12,
                            "user": "Tommy Maintz",
                            "iconCls": "tree-grid-task-folder",
                            "expanded": true,
                            "children": [{
                                "id": 7,
                                "task": "Retile kitchen",
                                "duration": 6.5,
                                "user": "Tommy Maintz",
                                "leaf": true,
                                "iconCls": "tree-grid-task"
                            }, {
                                "id": 8,
                                "task": "Paint bedroom",
                                "duration": 2.75,
                                "user": "Tommy Maintz",
                                "iconCls": "tree-grid-task-folder",
                                "children": [{
                                    "id": 9,
                                    "task": "Ceiling",
                                    "duration": 1.25,
                                    "user": "Tommy Maintz",
                                    "iconCls": "tree-grid-task",
                                    "leaf": true
                                }, {
                                    "id": 10,
                                    "task": "Walls",
                                    "duration": 1.5,
                                    "user": "Tommy Maintz",
                                    "iconCls": "tree-grid-task",
                                    "leaf": true
                                }]
                            }, {
                                "id": 11,
                                "task": "Decorate living room",
                                "duration": 2.75,
                                "user": "Tommy Maintz",
                                "leaf": true,
                                "iconCls": "tree-grid-task",
                                "done": true
                            }, {
                                "id": 12,
                                "task": "Fix lights",
                                "duration": .75,
                                "user": "Tommy Maintz",
                                "leaf": true,
                                "iconCls": "tree-grid-task",
                                "done": true
                            }, {
                                "id": 13,
                                "task": "Reattach screen door",
                                "duration": 2,
                                "user": "Tommy Maintz",
                                "leaf": true,
                                "iconCls": "tree-grid-task"
                            }]
                        }]
                    }, {
                        "id": 14,
                        "task": "Project: Testing",
                        "duration": 2,
                        "user": "Core Team",
                        "iconCls": "tree-grid-task-folder",
                        "children": [{
                            "id": 15,
                            "task": "Mac OSX",
                            "duration": 0.75,
                            "user": "Tommy Maintz",
                            "iconCls": "tree-grid-task-folder",
                            "children": [{
                                "id": 16,
                                "task": "FireFox",
                                "duration": 0.25,
                                "user": "Tommy Maintz",
                                "iconCls": "tree-grid-task",
                                "leaf": true
                            }, {
                                "id": 17,
                                "task": "Safari",
                                "duration": 0.25,
                                "user": "Tommy Maintz",
                                "iconCls": "tree-grid-task",
                                "leaf": true
                            }, {
                                "id": 18,
                                "task": "Chrome",
                                "duration": 0.25,
                                "user": "Tommy Maintz",
                                "iconCls": "tree-grid-task",
                                "leaf": true
                            }]
                        }, {
                            "id": 19,
                            "task": "Windows",
                            "duration": 3.75,
                            "user": "Darrell Meyer",
                            "iconCls": "tree-grid-task-folder",
                            "children": [{
                                "id": 20,
                                "task": "FireFox",
                                "duration": 0.25,
                                "user": "Darrell Meyer",
                                "iconCls": "tree-grid-task",
                                "leaf": true
                            }, {
                                "id": 21,
                                "task": "Safari",
                                "duration": 0.25,
                                "user": "Darrell Meyer",
                                "iconCls": "tree-grid-task",
                                "leaf": true
                            }, {
                                "id": 22,
                                "task": "Chrome",
                                "duration": 0.25,
                                "user": "Darrell Meyer",
                                "iconCls": "tree-grid-task",
                                "leaf": true
                            }, {
                                "id": 23,
                                "task": "Internet Explorer",
                                "duration": 3,
                                "user": "Darrell Meyer",
                                "iconCls": "tree-grid-task",
                                "leaf": true
                            }]
                        }, {
                            "id": 24,
                            "task": "Linux",
                            "duration": 0.5,
                            "user": "Aaron Conran",
                            "iconCls": "tree-grid-task-folder",
                            "children": [{
                                "id": 25,
                                "task": "FireFox",
                                "duration": 0.25,
                                "user": "Aaron Conran",
                                "iconCls": "tree-grid-task",
                                "leaf": true
                            }, {
                                "id": 26,
                                "task": "Chrome",
                                "duration": 0.25,
                                "user": "Aaron Conran",
                                "iconCls": "tree-grid-task",
                                "leaf": true
                            }]
                        }]
                    }]
                }
            }
        }
    },
    '/directory/customers': {
        type: 'json',  // use JsonSimlet (type is like xtype for components)
        data: {
            schema: {
                tree: [{
                    xtype: 'treecolumn',
                    text: 'Customer',
                    flex: 2,
                    sortable: true,
                    dataIndex: 'name'
                }, {
                    text: 'Phone #',
                    flex: 1,
                    dataIndex: 'phone',
                    sortable: true
                }]
            },
            data: {
                tree: {
                    "text": ".",
                    "children": [{
                        "id": 0,
                        "name": "Shopping",
                        "phone": "",
                        "iconCls": "tree-grid-task-folder",
                        "expanded": true,
                        "children": [{
                            "id": 1,
                            "name": "Kitchen suppliesz",
                            "phone": "",
                            "expanded": true,
                            "iconCls": "tree-grid-task-folder",
                            "children": [{
                                "id": 2,
                                "phone": "+380677031006",
                                "name": "Tommy Maintz",
                                "leaf": true,
                                "iconCls": "tree-grid-task"
                            }]
                        }]
                    }]
                }
            }
        }
    }
});