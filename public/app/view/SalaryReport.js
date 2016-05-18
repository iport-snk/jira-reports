Ext.define('JC.view.SalaryReport', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.SalaryReport',
    store: 'SalaryReport',
    tbar: [{
        xtype: 'combo',
        id: 'employeeSelector',
        fieldLabel: 'Работник',
        store: Ext.create('Ext.data.Store',{
            fields: ['employee', 'employee_type'],
            proxy: {
                type: 'ajax',
                url: '/workers',
                reader: {type: 'json'}
            },
            autoLoad: true
        }),
        queryMode: 'local',
        displayField: 'employee',
        valueField: 'employee'
    }],
    features: [{
        id: 'group',
        ftype: 'groupingsummary',
        groupHeaderTpl: '{name}',
        hideGroupedHeader: true,
        enableGroupingMenu: true
    }, {
        ftype: 'summary',
        dock: 'bottom'
    }],
    columns: [{
        header: 'employee',
        dataIndex: 'employee'
    },{
        header: 'issue',
        dataIndex: 'issue'

    },{
        header: 'type_name',
        dataIndex: 'type_name',
        renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
            return value == 0 ? '' : value + ' (' + record.get('unit') + ')';
        },
        width: 200
    },{
        header: 'work',
        dataIndex: 'work',
        align: 'right',
        renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
            return value == 0 ? '' : Ext.util.Format.number(value, '0.00');
        }
    },{
        header: 'rate',
        dataIndex: 'rate',
        align: 'right',
        renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
            return (value == 0 || record.get('work') == 0 ) ? '' : Ext.util.Format.number(value, '0.00');
        }
    },{
        header: 'cost',
        dataIndex: 'cost',
        align: 'right',
        renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
            return value == 0 ? '' : Ext.util.Format.number(value, '0.00');
        },
        summaryRenderer: function(value, summaryData, dataIndex) {
            return value == 0 ? '' : Ext.util.Format.number(value, '0.00');
        },
        summaryType: 'sum'
    }]
});