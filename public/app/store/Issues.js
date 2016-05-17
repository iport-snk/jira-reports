Ext.define('JC.store.Issues', {
    extend : 'Ext.data.Store',
    fields: [
        {name:'issue'},
        {name:'priority'},
        {name:'duedate', type: 'date'},
        {name:'priority_name'},
        {name:'labels'},
        {name:'reporter'},
        {name:'summary'},
        {name:'description'},
        {name:'issuestatus'},
        {name: 'status_name'}
    ],
    storeId: 'Issues',
    proxy: {
        type: 'ajax',
        url: '/issues',
        reader: {
            type: 'json'
        }
    },
    autoLoad: true
})