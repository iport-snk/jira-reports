Ext.define('Doc.ux.Directory', {
    extend: 'Ext.window.Window',
    alias: 'widget.Directory',
    items: {
        xtype: 'treepanel',
        border: false,
        useArrows: true,
        rootVisible: false,
        multiSelect: false,
        singleExpand: true,
        selModel: {
            selType: 'treemodel', // rowmodel is the default selection model
            mode: 'SINGLE', // Allows selection of multiple rows
            enableKeyNav: false
        },
        selectOnExpanderClick: true
    },



    listeners: {
        reconfigure: function(){
            var tree = this.down('tree');

            if (me.value){
                var node = tree.store.getNodeById(me.value.id);
                if (!node) node = tree.store.getRoot();
                tree.selectPath(node.getPath());
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
        var tree = this.down('tree');
        Doc.utils.StoreManager.getStore(this.uri).then(function(store){
            tree.reconfigure(store, store.columns);

        });

        return this;
    }

});