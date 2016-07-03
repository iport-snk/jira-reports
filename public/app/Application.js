Ext.Loader.setPath('Ext.ux', '/ext-6.0.1/ux');
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

        Promise.all([
            Ext.Ajax.request({url: '/sprints/employee'}),
            Ext.Ajax.request({url: '/sprints'})
        ]).then(function(rs){
            JC.app.employee = Ext.decode(rs[0].responseText);
            JC.app.sprints = Ext.decode(rs[1].responseText);
        });



        Ext.override(Ext.MessageBox, {
            buttonText: { yes: "Да", no: "Нет", cancel: "Отмена" }
        });

        Ext.create('JC.view.Viewport');

    }
});
