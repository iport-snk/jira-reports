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

    expand: function() {
        var me = this,
            bodyEl, ariaDom, picker, doc;

        if (me.rendered && !me.isExpanded && !me.destroyed) {
            bodyEl = me.bodyEl;
            picker = me.getPicker();
            doc = Ext.getDoc();
            picker.setMaxHeight(picker.initialConfig.maxHeight);

            if (me.matchFieldWidth) {
                picker.setWidth(me.bodyEl.getWidth());
            }

            // Show the picker and set isExpanded flag. alignPicker only works if isExpanded.
            picker.show();
            me.isExpanded = true;
            //me.alignPicker();
            bodyEl.addCls(me.openCls);

            if (me.ariaRole) {
                ariaDom = me.ariaEl.dom;

                ariaDom.setAttribute('aria-owns', picker.listEl ? picker.listEl.id : picker.el.id);
                ariaDom.setAttribute('aria-expanded', true);
            }

            // Collapse on touch outside this component tree.
            // Because touch platforms do not focus document.body on touch
            // so no focusleave would occur to trigger a collapse.
            me.touchListeners = doc.on({
                // Do not translate on non-touch platforms.
                // mousedown will blur the field.
                translate:false,
                touchstart: me.collapseIf,
                scope: me,
                delegated: false,
                destroyable: true
            });

            // Scrolling of anything which causes this field to move should collapse
            me.scrollListeners = Ext.on({
                scroll: me.onGlobalScroll,
                scope: me,
                destroyable: true
            });

            // Buffer is used to allow any layouts to complete before we align
            Ext.on('resize', me.alignPicker, me, {buffer: 1});
            me.fireEvent('expand', me);
            me.onExpand();
        }
    },

    onSelect: function(m, d) {
        var me = this;

        me.setValue(d);
        me.fireEvent('select', me, d);
        me.collapse();
    }

})