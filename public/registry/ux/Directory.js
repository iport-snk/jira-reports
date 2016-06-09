Ext.define('Doc.ux.Directory', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.Directory',
    border: true,
    useArrows: true,
    rootVisible: false,
    multiSelect: false,
    singleExpand: true,
    selModel: {
        selType: 'treemodel', // rowmodel is the default selection model
        mode: 'SINGLE', // Allows selection of multiple rows
        enableKeyNav: false
    },
    selectOnExpanderClick: true,
    listeners: {
        reconfigure: function(){
            var me = this;
// TODO: analize Ext.ux.TreePicker
            if (me.value){
                var node = me.store.getNodeById(me.value.id);
                if (!node) node = store.getRoot();
                this.selectPath(node.getPath());
            }

        }
    },
    initComponent: function() {
        var me = this;
        //Ext.apply(me, me.getDirectoryConfig());
        me.callParent();



        /*this.addEvents(
            /!**
             * @event select
             * Fires when a date is selected
             * @param {JC.view.Directory} this Directory
             * @param {Directory item}  The selected item
             *!/
            'select'
        );*/
    },

    initEvents: function(){
        this.callParent();
        // TODO: need to find out how value should correctly come here

    },
    setValue : function(value){
        this.value = value;
        return this.update(this.value);
    },

    /**
     * Gets the current selected value of the date field
     * @return {Date} The selected date
     */
    getValue : function(){
        return this.value;
    },

    /**
     * Perform any post-select actions
     * @private
     */
    onSelect: function() {
        if (this.hideOnSelect) {
            this.hide();
        }
    },
    /**
     * Update the contents of the picker
     * @private
     * @param {Date} date The new date
     */
    update : function(date){
        var me = this;
        Doc.utils.StoreManager.getStore(me.uri).then(function(store){
            me.reconfigure(store, store.columns);

        });

        return me;
    }

});