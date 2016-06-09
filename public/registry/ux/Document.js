Ext.define('Doc.ux.Document', {
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
                        xtype: 'treepicker',
                        displayField: 'text',
                        rootVisible: false,
                        name: 'expenses',
                        fieldLabel: 'Expenses',
                        columns: [
                            {dataIndex: "text", width: 400, xtype: 'treecolumn', text: "Name"},
                            {dataIndex: "qtty", width: 80, text: "Qtty"}
                        ],
                        store: Ext.create('Ext.data.TreeStore', {
                            root: {
                                expanded: true,
                                children: [
                                    { text: 'detention', qtty: 10, leaf: true },
                                    { text: 'homework', expanded: true, children: [
                                        { text: 'book report', qtty: 30, leaf: true },
                                        { text: 'algebra', qtty: 20, leaf: true}
                                    ] },
                                    { text: 'buy lottery tickets', qtty: 10, leaf: true }
                                ]
                            }
                        })
                    }],
                    selModel: 'cellmodel',

                    plugins: {
                        ptype: 'cellediting',
                        clicksToEdit: 1
                    },
                    columns: Doc.utils.ComponentFactory.createColumns(doc),
                    store: Doc.utils.ComponentFactory.createStore(doc),
                    forceFit: true
                }]);

                doc.down('form').getForm().setValues(doc.data.form);
            });
        });
     }

});