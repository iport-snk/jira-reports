Ext.define('JC.view.Registry', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.Registry',
    forceFit: true,
    border: false,
    tbar: [{
        text: 'New',
        scope: this,
        menu: [{
            text:'Menu Item 1'
        },{
            text:'Menu Item 2'
        },{
            text:'Menu Item 3'
        }]
    }],
    listeners: {
        rowkeydown: function(row, record, tr, rowIndex, e, eOpts){
            console.log(e.keyCode)
        },
        rowdblclick: function(row, record, tr, rowIndex, e, eOpts){
            var tabs = this.up('tabpanel'),
                id = record.get('documentId'),
                tab = tabs.down('Document[url="' + id + '"]');

            if (!tab) {
                tab = tabs.add({
                    title: 'Tab ' + (tabs.items.length + 1),
                    xtype: 'Document',
                    url: id,
                    closable: true
                });
            }
            tabs.setActiveTab(tab);
        }
    },
    initComponent: function() {
        var doc = this;
        this.callParent();
        this.on('beforerender', function(){
            Ext.Ajax.request({
                url: doc.url
            }).then(function(response, opts) {
                Ext.apply(doc, Ext.decode(response.responseText));
                doc.reconfigure(
                    JC.utils.ComponentFactory.createStore(doc),
                    JC.utils.ComponentFactory.createColumns(doc)
                );

            });
        });
    }

});