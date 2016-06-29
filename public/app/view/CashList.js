Ext.define('JC.view.CashList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.CashList',
    forceFit: true,
    store: Ext.create('Ext.data.Store', {
        storeId: 'CashList',
        fields: [
            {name: 'amount'},
            {name: 'date', type: 'date'},
            {name: 'reason'},
            {name: 'comment'},
            {name: 'category'}
        ],
        proxy: {
            type: 'ajax',
            url: '/cash',
            reader: {
                type: 'json',
                keepRawData: true
            }
        },
        autoLoad: false
    }),
    tbar:[{
        text: 'Приход',
        itemId: 'btnIncome'
    },{
        text: 'Расход',
        itemId: 'btnOutcome'
    },'->', {
        text: 'Открыть',
        itemId: 'btnOpen',
        disabled: true
    },{
        text: 'Удалить',
        itemId: 'btnDel',
        disabled: true
    }],
    columns: [{
        header: 'Дата',
        dataIndex: 'date',
        xtype: 'datecolumn',
        width: 160,
        format:'Y-m-d h:m:s'
    },{
        header: 'Коментарий',
        dataIndex: 'reason',
        flex: 1
    },{
        header: 'Расход',
        dataIndex: 'amount',
        align: 'right',
        xtype: 'numbercolumn',
        format:'0.00',
        renderer: function(value) {
            return value < 0 ? Ext.util.Format.number(value * -1, '0.00') : '';
        }
    },{
        header: 'Приход',
        dataIndex: 'amount',
        align: 'right',
        xtype: 'numbercolumn',
        format:'0.00',
        summaryType: 'sum',
        summaryRenderer: function(value) {
            return Ext.util.Format.number(value, '0.00');
        },
        renderer: function(value) {
            return value > 0 ? Ext.util.Format.number(value, '0.00') : '';
        }
    }],
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
});