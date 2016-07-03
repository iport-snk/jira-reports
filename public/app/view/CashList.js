Ext.define('JC.view.CashList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.CashList',
    forceFit: true,
    store: Ext.create('Ext.data.Store', {
        storeId: 'CashList',
        fields: [
            {name: 'id'},
            {name: 'amount'},
            {name: 'date', type: 'date'},
            {name: 'employer'},
            {name: 'sprints'}
        ],
        proxy: {
            type: 'ajax',
            url: '/sprints/payed',
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
        header: 'Спринты',
        dataIndex: 'sprints',
        flex: 1,
        renderer: function(sprints) {
            return sprints.reduce(function(prev, curr){
                var sprint = JC.app.sprints.find(function(item){
                    return item.id == curr;
                });
                return prev + (prev.length > 0 ? " | "  : "")  + (sprint ? sprint.name : '');
            }, "");
        }
    },{
        header: 'Работник',
        dataIndex: 'employer',
        renderer: function(value) {
            var empl = JC.app.employee.find(function(item){
                return item.id == value;
            });
            return empl.name;
        },
        width: 150
    },{
        header: 'Сумма',
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
    }]
});