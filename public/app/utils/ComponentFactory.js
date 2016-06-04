Ext.define('JC.utils.ComponentFactory', {
    singleton: true,
    createStore: function(configs ,data){
        return Ext.create('Ext.data.Store', {
            fields: configs.map(function(config){
                return {name: config.dataIndex}
            }),
            data: data,
            autoLoad: false
        });
    },
    createColumns: function(columns ){
        return columns.filter(function(column){
            return !Ext.isEmpty(column.header);
        });
    }
});