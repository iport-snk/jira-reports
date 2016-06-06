Ext.define('JC.Application', {
    extend: 'Ext.app.Application',
    namespace: 'JC',
    requires:[
        'Ext.tab.Panel',
        'Ext.data.TreeModel',
        'Ext.layout.container.Border',
        'JC.utils.Format',
        'JC.utils.ComponentFactory',
        'JC.view.Viewport',
        'JC.view.DirectoryField'
    ],

    models: [],
    controllers: ['SalaryReport', 'Payments'],
    stores: ['SalaryReport', 'Labels'],
    launch: function () {
        Ext.create('JC.view.Viewport');
    }
});
