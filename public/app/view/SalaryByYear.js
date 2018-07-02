Ext.define('JC.view.SalaryByYear', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.SalaryByYear',
    tbar: [{
        xtype: 'combo',
        itemId: 'employeeSelector',
        fieldLabel: 'Работник',
        store: Ext.create('Ext.data.Store',{
            fields: ['code', 'type', 'name', 'position', 'commission'],
            proxy: {
                type: 'ajax',
                url: '/sprints/employee',
                reader: {type: 'json'}
            },
            autoLoad: true
        }),
        queryMode: 'local',
        displayField: 'name',
        valueField: 'code',
        width: 350,
        listeners: {
            change: function (combo) {
                var record = combo.getSelection();

                Ext.getStore('SalaryGrouped').load({
                    params: {employee: record.get('code')}
                });
            }
        }
    }],
    store: Ext.create('Ext.data.Store',{
        fields: ['period', 'amount'],
        storeId: 'SalaryGrouped',
        proxy: {
            type: 'ajax',
            url: '/salary-grouped',
            reader: {type: 'json'}
        }
    }),
    columns: [{
        text: 'Период',
        dataIndex: 'period',
        flex: 1
    }, {
        text: 'Сумма',
        dataIndex: 'amount',
        xtype: 'numbercolumn',
        width: 200,
        align: 'right'
    }]
})