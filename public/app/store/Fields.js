Ext.define('JC.store.Fields', {
    extend : 'Ext.data.Store',
    storeId: 'Fields',
    fields: [
        {name:'component'},
        {name:'group'},
        {name:'configuration', type: 'auto'}
    ],

    data: [
        {component: 'Document.Invoice', group: 'form', configuration: {
            xtype: 'textfield',
            name: 'description',
            fieldLabel: 'Description'
        }},
        {component: 'Document.Invoice', group: 'form', configuration: {
            xtype: 'combo',
            name: 'assignee',
            fieldLabel: 'Assignee'
        }},
        {component: 'Document.Invoice', group: 'grid', configuration: {
            header: 'Done',
            dataIndex: 'resolutiondate',
            formatter: 'date("d.m.Y")',
            flex: 1
        }},
        {component: 'Document.Invoice', group: 'grid', configuration: {
            header: '... not yet',
            dataIndex: 'resolution'
        }}
    ]

});