Ext.define('Doc.ux.Document', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.Document',
    border: false,
    tbar: [],
    initComponent: function() {
        var doc = this;
        this.items = [];
        this.callParent();
        this.on('beforerender', function(){
            Ext.Ajax.request({
                url: doc.url
            }).then(function(response, opts) {
                Ext.apply(doc, Ext.decode(response.responseText));
                debugger;
                doc.down('toolbar').add([{
                    xtype: 'textfield',
                    fieldLabel: doc.data.info.name,
                    value:  doc.data.info.num,
                    labelAllign: 'right',
                    labelWidth: false,
                    labelStyle: 'width: auto'
                },{
                    xtype: 'datefield',
                    fieldLabel: 'от',
                    value:  doc.data.info.date,
                    labelWidth: false,
                    labelStyle: 'width: auto'
                },'->',{
                    text:'Сохранить'
                }, {
                    text:'Удалить'
                }]);
                doc.add([{
                    xtype: 'form',
                    border: false,
                    bodyPadding: 5,
                    layout: 'form',
                    items: doc.schema.form
                },{
                    xtype: 'grid',
                    tbar:[],
                    selModel: 'rowmodel',

                    plugins: {
                        ptype: 'rowediting',
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