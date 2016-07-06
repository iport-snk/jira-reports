Ext.define('JC.view.Employee', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.Employee',
    forceFit: true,
    store: Ext.create('Ext.data.Store', {
        storeId: 'Employee',
        fields: ['id', 'jira_code', 'first_name', 'last_name', 'active'],
        proxy: {
            type: 'ajax',
            url: '/employee',
            reader: {
                type: 'json',
                keepRawData: true
            }
        },
        autoLoad: true
    }),
    tbar:[{
        text: 'Добавить',
        handler: function(btn) {
            var grid = btn.up('grid');
            var record = grid.store.add({first_name: 'Lalala', last_name: 'Lalala', active: true});
        }
    },'->', {
        text: 'Удалить',
        handler: function(btn) {
            var grid = btn.up('grid'),
                record = grid.getSelection()[0];

            grid.store.remove(record);
        }
    },{
        text: 'Сохранить',
        itemId: 'saveBtn',
        handler: function(btn){
            var grid = btn.up('grid'),
                records = grid.store.getModifiedRecords().map(function(record){
                    return record.getData();
                }),
                removed = grid.store.getRemovedRecords().map(function(record){
                    return record.getData();
                });

            Ext.Ajax.request({
                url: '/employee',
                method: 'POST',
                jsonData: {
                    records: records,
                    removed: removed
                }
            }).then(function(response){
                grid.store.commitChanges();
            });
        }
    }],
    columns: [{
        text: 'Код',
        dataIndex: 'jira_code',
        field: {
            xtype: 'combo',
            store: 'Workers',
            displayField: 'name',
            valueField: 'id'

        }
    },{
        text: 'Имя',
        dataIndex: 'first_name',
        field: {
            xtype: 'textfield',
            allowBlank: false
        }
    },{
        text: 'Фамилия',
        dataIndex: 'last_name',
        field: {
            xtype: 'textfield',
            allowBlank: false
        }

    },{
        text: 'Тип',
        dataIndex: 'jira_code',
        renderer: function(value) {
            var workers = Ext.getStore('Workers');

            workers.clearFilter();
            var record = workers.findRecord('id', value);
            if (record ) {
                return record.get('type');
            } else {
                return '';
            }
        }
    },{
        text: 'Актив',
        dataIndex: 'active',
        align: 'center',
        renderer: function(value) {
            return value ? 'да' : 'нет'
        },
        field: {
            xtype: 'checkbox'
        },
        width: 20
    }],
    selModel: 'cellmodel',
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 2,
        listeners: {
            beforeedit: function(e, editor){
                Ext.getStore('Workers').clearFilter();
                Ext.getStore('Workers').filterBy(function(worker){
                    return (editor.store.find('jira_code', worker.get('id')) == -1 ||
                        worker.get('id') == editor.record.get('jira_code'))
                })
            }
        }
    }

});