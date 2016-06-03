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
    }
});