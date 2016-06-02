Ext.define('JC.store.FieldConfigurations', {
    extend : 'Ext.data.Store',
    fields: [
        {name:'component', type: 'text'},
        {name:'group', type: 'text'},
        {name:'configuration', type: 'auto'}
    ],
    storeId: 'FieldConfigurations',
    data: [
        {component: 'Document', group: 'form', configuration: [{},{}]},
        {component: 'Document', group: 'form', configuration: [{},{}]},
        {component: 'Document', group: 'form', configuration: [{},{}]},
        {component: 'Document', group: 'grid', configuration: [{},{}]},
        {component: 'Document', group: 'grid', configuration: [{},{}]},
        {component: 'Document', group: 'grid', configuration: [{},{}]}
    ]

});