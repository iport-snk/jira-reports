Ext.define('JC.utils.ComponentFactory', {
    singleton: true,
    createFields: function(documentType) {
        return [{
            xtype: 'textfield',
            name: 'txt-test1',
            fieldLabel: 'Alignment'
        },{
            xtype: 'textfield',
            name: 'txt-test2',
            fieldLabel: 'Alignment - 2'
        }]
    },
    createField: function(configuration){
        return {};
    }
});