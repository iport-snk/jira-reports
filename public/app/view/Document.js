Ext.define('JC.view.Document', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.Document',
    border: false,
    initComponent: function() {
        var store = JC.utils.ComponentFactory.createStore(this.params.type);
        store.on('load', function(){
            debugger;
        });
        this.items = [{
            xtype: 'panel',
            border: false,
            bodyPadding: 5,
            layout: 'form',
            items: JC.utils.ComponentFactory.createFields(this.params.type)
        },{
            xtype: 'grid',
            columns: JC.utils.ComponentFactory.createColumns(this.params.type),
            store: store,
            forceFit: true
        }];
        this.callParent();
        this.load = function(){
            Ext.Ajax.request({
                url: 'document/' + this.params.id
            }).then(function(response, opts) {
                debugger;
                var obj = Ext.decode(response.responseText);
                console.dir(obj);
            });
            //store.load();
        };
        this.on('beforerender', function(){
            this.load();
        })
    }

});