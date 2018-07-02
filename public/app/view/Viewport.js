Ext.define('JC.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border',

        'JC.view.SalaryReport',
        'JC.view.TaskList',
        'JC.view.TaskRow',
        'JC.view.Payments',
        'JC.view.PaymentTotals',
        'JC.view.CashList',
        'JC.view.CashIncome',
        'JC.view.CashOutcome',
        'JC.view.Employee',
        'JC.view.SalaryByYear'
    ],

    layout: {
        type: 'border'
    },
    items: [{
        region: 'center',
        layout: 'fit',
        xtype: 'tabpanel',
        items:[{
            title: 'Зарплата',
            xtype: 'SalaryReport'
        },{
            title: 'Начисления',
            xtype: 'CashList'
        },{
            title: 'Работники',
            xtype: 'Employee'
        },{
            title: 'Зарплаты за период',
            xtype: 'SalaryByYear'
        }]


    }]
});