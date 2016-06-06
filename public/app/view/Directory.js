Ext.define('JC.view.Directory', {
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
    initComponent: function() {
        Ext.apply(this, this.getDirectoryConfig());
        this.callParent();

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
    getDirectoryConfig: function(){
        return {
            store: new Ext.data.TreeStore({
                fields:  [{
                    name: 'task',
                    type: 'string'
                }, {
                    name: 'user',
                    type: 'string'
                }, {
                    name: 'duration',
                    type: 'float'
                }, {
                    name: 'done',
                    type: 'boolean'
                }],
                proxy: {
                    type: 'ajax',
                    url: '/directory/products'
                },
                folderSort: true
            }),
            columns: [{
                xtype: 'treecolumn', //this is so we know which column will show the tree
                text: 'Task',
                flex: 2,
                sortable: true,
                dataIndex: 'task'
            },{
                //we must use the templateheader component so we can use a custom tpl
                xtype: 'templatecolumn',
                text: 'Duration',
                flex: 1,
                sortable: true,
                dataIndex: 'duration',
                align: 'center',
                //add in the custom tpl for the rows
                tpl: Ext.create('Ext.XTemplate', '{duration:this.formatHours}', {
                    formatHours: function(v) {
                        if (v < 1) {
                            return Math.round(v * 60) + ' mins';
                        } else if (Math.floor(v) !== v) {
                            var min = v - Math.floor(v);
                            return Math.floor(v) + 'h ' + Math.round(min * 60) + 'm';
                        } else {
                            return v + ' hour' + (v === 1 ? '' : 's');
                        }
                    }
                })
            }, {
                text: 'Assigned To',
                flex: 1,
                dataIndex: 'user',
                sortable: true
            }, {
                text: 'Edit',
                width: 55,
                menuDisabled: true,
                xtype: 'actioncolumn',
                tooltip: 'Edit task',
                align: 'center',
                icon: 'resources/images/edit_task.png',
                handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                    Ext.Msg.alert('Editing' + (record.get('done') ? ' completed task' : '') , record.get('task'));
                },
                // Only leaf level tasks may be edited
                isDisabled: function(view, rowIdx, colIdx, item, record) {
                    return !record.data.leaf;
                }
            }]
        }
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

        return me;
    },

});