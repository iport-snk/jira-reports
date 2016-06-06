Ext.define('JC.view.Document', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.Document',
    border: false,
    initComponent: function() {
        var doc = this;
        this.items = [];
        this.callParent();
        this.on('beforerender', function(){
            Ext.Ajax.request({
                url: doc.url
            }).then(function(response, opts) {
                Ext.apply(doc, Ext.decode(response.responseText));
                doc.add([{
                    xtype: 'form',
                    border: false,
                    bodyPadding: 5,
                    layout: 'form',
                    items: doc.schema.form
                },{
                    xtype: 'grid',
                    tbar:[{
                        text: '+',
                        handler: function(){
                            var picker = Ext.create('JC.view.Directory',{
                                floating: true,
                                modal: true,
                                width: 800,
                                height: 400
                            });
                            picker.show();

                        }
                    }],
                    selModel: 'cellmodel',

                    plugins: {
                        ptype: 'cellediting',
                        clicksToEdit: 1
                    },
                    columns: doc.schema.grid,
                    store: JC.utils.ComponentFactory.createStore(doc.schema.grid, doc.data.grid.rows),
                    forceFit: true
                }]);

                doc.down('form').getForm().setValues(doc.data.form);
            });
        });
     }

});