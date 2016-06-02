Ext.define('JC.plugin.ColumnFactory', {
    extend: 'Ext.plugin.Abstract',

    alias: 'plugin.columnfactory',
    constructor: function(config) {

        this.callParent([config]);

    },

    init: function(grid) {

        this.grid = grid;
        grid.reconfigure(null, [{
            header: 'Done',
            dataIndex: 'resolutiondate',
            formatter: 'date("d.m.Y")',
            flex: 1
        },{
            header: '... not yet',
            dataIndex: 'resolution'

        }]);
        //this.callParent(arguments);



    }
});