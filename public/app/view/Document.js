Ext.define('JC.view.Document', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.Document',
    border: false,
    initComponent: function() {
        this.items = [{
            xtype: 'panel',
            border: false,
            bodyPadding: 5,
            layout: 'form',
            items: JC.utils.ComponentFactory.createFields()
        },{
            xtype: 'grid',
            // TODO: replace plugin with call to ComponentFactory.createColumns
            plugins: 'columnfactory',
            forceFit: true
        }];
        this.callParent();
    }

});