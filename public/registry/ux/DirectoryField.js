Ext.define('Doc.ux.DirectoryField', {
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

        var picker = Ext.create('Doc.ux.Directory',{
            uri: me.uri,
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
    setValue: function(value) {
        var me = this,
            displayValue;

        if (value instanceof Ext.data.Model) {
            displayValue = value.get(this.displayField);
        } else if (Ext.isObject(value)) {
            displayValue = value[this.displayField];
        };

        me.value = value;
        me.setRawValue(displayValue);
    },
    getValue: function(){
        return this.value;
    },
    onSelect: function(m, node) {
        var me = this;
        if (node.isLeaf()) {
            me.setValue(node);
            me.fireEvent('select', me, node);
            me.collapse();
        }

    },
    onExpand: function() {
        this.picker.setValue(this.value);
    }

});