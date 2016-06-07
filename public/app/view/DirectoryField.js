Ext.define('JC.view.DirectoryField', {
    extend: 'Ext.form.field.Picker',
    alias: 'widget.directoryfield',

    triggerCls : Ext.baseCSSPrefix + 'form-date-trigger',
    matchFieldWidth: false,

    initComponent : function(){
        var me = this;

        me.callParent();
    },
    createPicker: function() {
        var me = this;

        var picker = Ext.create('JC.view.Directory',{
            floating: true,
            modal: true,
            width: 800,
            height: 400,
            listeners: {
                scope: me,
                select: me.onSelect
            },
            keyNavConfig: {
                esc: function() {
                    me.collapse();
                }
            }
        });

        return picker;
    },
    doAlign: function(){
        // don't want to align
    },
    setValue: function(par) {
        var v = par;

        if (par instanceof Ext.data.Model) {
            v = par.get(this.displayField);
        } else if (Ext.isObject(par)) {
            v = par[this.displayField];
        };
         this.callParent([v]);
    },
    onSelect: function(m, node) {
        var me = this;
        if (node.isLeaf()) {
            me.setValue(node);
            me.fireEvent('select', me, node);
            me.collapse();
        }

    }

})