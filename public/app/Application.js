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

        'Doc.utils.ComponentFactory',
        'Doc.utils.StoreManager',
        'Doc.ux.DirectoryField',
        'Doc.ux.Registry',
        'Doc.ux.Document',
        'Doc.ux.DocumentPicker',
        'Doc.ux.Directory',


        'JC.view.Viewport'
    ],

    models: [],
    controllers: ['SalaryReport', 'Payments'],
    stores: ['SalaryReport', 'Labels'],
    launch: function () {
        Ext.create('JC.view.Viewport');
    }
});
