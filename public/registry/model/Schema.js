Ext.define('Doc.model.Schema', {
    singleton: true,
    table: horizon('schemas'),
    update: function(){
        var me = this;
        this.configs.forEach(function(config){
            me.table.findAll({type: config.type, name: config.name}).fetch().subscribe(function(result){
                me.table.store(config)
            });
        });
    },
    configs: [{
        type: "document",
        name: "invoice",
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
                    xtype: 'docpicker',
                    uri: '/directory/products',
                    displayField: 'task'
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
        }
    },{
        type: "dictionary",
        name: "product",
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
        }
    },{
        type: "dictionary",
        name: "customer",
        schema: {
            tree: [{
                xtype: 'treecolumn',
                text: 'Customer',
                flex: 3,
                sortable: true,
                dataIndex: 'name'
            }, {
                text: 'Phone #',
                flex: 2,
                dataIndex: 'phone',
                sortable: true
            }, {
                text: 'Priority',
                flex: 1,
                dataIndex: 'priority',
                sortable: true
            }]
        }
    }]
})