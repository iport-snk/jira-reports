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
        'JC.view.Registry',
        'JC.view.Document',
        'JC.view.Directory'
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
            title: 'Плaтежи',
            xtype: 'Payments'
        },{
            title: 'Registry',
            xtype: 'Registry',
            url: '/registry/invoices'

        }/*,{
            title: 'Products',
            xtype: 'Directory',
            url: '/directory/products'

         },{
            title: 'Documents',
            xtype: 'Document',
            url: '/document/invoice/1'

        },{
            title: 'Фильтры',
            xtype: 'Filters'
        },{
            title: 'Задачи',
            xtype: 'TaskList'
        }*/
        ]


    }]
});