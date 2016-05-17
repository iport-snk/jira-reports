Ext.define('JC.store.Labels', {
    extend : 'Ext.data.Store',
    fields: ['label'],
    proxy: {
        type: 'ajax',
        url: '/labels',
        reader: {
            type: 'json'
        }
    },
    autoLoad: true
});