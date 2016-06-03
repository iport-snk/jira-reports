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
    initComponent: function() {
        var doc = this;
        this.callParent();
        this.on('beforerender', function(){
            Ext.Ajax.request({
                url: doc.url
            }).then(function(response, opts) {
                Ext.apply(doc, Ext.decode(response.responseText));
                var store = JC.utils.ComponentFactory.createStore(doc.schema.grid, doc.data.grid.rows);
                doc.reconfigure(store, doc.schema.grid);

            });
        });
    }

});