Ext.define('Doc.ux.Document', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.Document',
    border: false,
    layout: {
        type: 'vbox'
    },
    items: [{
        xtype: 'form',
        border: false,
        bodyPadding: 5,
        layout: 'form',
        items: doc.schema.form
    },{
        xtype: 'grid',
        flex: 1,
        minHeight: 250,
        tbar:[{
            text: '+',
            handler : function() {
                var grid = this.up('grid'),
                    rowEditing = grid.editingPlugin,
                    store = grid.store;

                rowEditing.cancelEdit();

                var rs = store.insert(0,
                    {resolutiondate: '2016-01-01 00:00:00', resolution: 'fixed', product: {"id": 18, "task": "Chrome"}}
                );
                rowEditing.startEdit(rs[0], 0);
            }
        }, {
            itemId: 'removeRow',
            text: '-',
            handler: function() {
                var grid = this.up('grid'),
                    rowEditing = grid.editingPlugin,
                    sm = grid.getSelectionModel(),
                    store = grid.store;

                rowEditing.cancelEdit();
                store.remove(sm.getSelection());
                if (store.getCount() > 0) {
                    sm.select(0);
                }
            },
            disabled: true
        }],
        selModel: 'rowmodel',

        plugins: {
            ptype: 'rowediting',
            clicksToMoveEditor: 1,
            autoCancel: false
        },
        columns: Doc.utils.ComponentFactory.createColumns(doc),
        store: Doc.utils.ComponentFactory.createStore(doc),
        forceFit: true,
        listeners: {
            'selectionchange': function(view, records) {
                view.view.up('grid').down('#removeRow').setDisabled(!records.length);
            }
        }
    }],
    initComponent: function() {
        var doc = this;

        this.callParent();
        this.on('beforerender', function(){
            Ext.Ajax.request({
                url: doc.url
            }).then(function(response, opts) {
                Ext.apply(doc, Ext.decode(response.responseText));
                return;
                doc.down('form').add(doc.schema.form);
                doc.down('form').getForm().setValues(doc.data.form);
            });
        });
     }

});