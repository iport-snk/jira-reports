Ext.define('JC.model.Label', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'issue', reference: 'Issue' },
        {name: 'fieldid'},
        {name: 'label'}
    ]
});