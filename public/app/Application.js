Ext.define('JC.Application', {
    extend: 'Ext.app.Application',
    namespace: 'JC',
    requires:[
        'Ext.tab.Panel',
        'Ext.data.TreeModel',
        'Ext.layout.container.Border',

        'JC.view.Viewport'
    ],

    models: [],
    controllers: ['SalaryReport'],
    stores: ['SalaryReport', 'Labels'],
    launch: function () {
        Ext.create('JC.view.Viewport');
    }
});
