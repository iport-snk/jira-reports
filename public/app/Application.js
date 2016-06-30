Ext.Loader.setPath('Doc', '/registry');
Ext.define('JC.Application', {
    extend: 'Ext.app.Application',
    namespace: 'JC',
    requires:[
        'Ext.tab.Panel',
        'Ext.data.TreeModel',
        'Ext.layout.container.Border',
        'Ext.ux.TreePicker',
        'JC.utils.Format',

        'JC.view.Viewport'
    ],

    models: [],
    controllers: ['SalaryReport', 'Payments', 'CashList', 'CashOutcome'],
    stores: ['SalaryReport', 'Labels'],
    launch: function () {

        Ext.override(Ext.MessageBox, {
            buttonText: { yes: "Да", no: "Нет", cancel: "Отмена" }
        });

        Ext.create('JC.view.Viewport');

    }
});
