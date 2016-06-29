Ext.Loader.setConfig({
    enabled: true
});
Ext.Loader.setPath('Ext.ux', '/ext-6.0.1/ux');
Ext.require([
    'Ext.ux.ajax.DataSimlet',
    'Ext.ux.ajax.JsonSimlet',
    'Ext.ux.ajax.Simlet',
    'Ext.ux.ajax.SimManager',
    'Ext.ux.ajax.SimXhr',
    'Ext.ux.ajax.XmlSimlet'
]);

Ext.onReady(function () {
    Ext.ux.ajax.SimManager.init({
        delay: 1,
        defaultType: 'json',// use JsonSimlet
        defaultSimlet: null
    }).register(window.MOCK_DATA);
});