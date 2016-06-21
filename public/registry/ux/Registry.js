Ext.define('Doc.ux.Registry', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.Registry',
    forceFit: true,
    border: false,
    tbar: [{
        text: 'Создать',
        itemId: 'createDocument',
        scope: this,
        menu: []
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
                var addNewBtn = doc.down('button#createDocument').menu,
                    menuItems = [];

                Ext.apply(doc, Ext.decode(response.responseText));
                doc.data.types.forEach(function(item){
                    menuItems.push({
                        text: item.name,
                        uri: item.uri,
                        handler: doc.newDocument
                    })
                });
                addNewBtn.add(menuItems);
                doc.reconfigure(
                    Doc.utils.ComponentFactory.createStore(doc),
                    Doc.utils.ComponentFactory.createColumns(doc)
                );

            });
        });
    },
    newDocument: function(item){
        debugger;
    }

});