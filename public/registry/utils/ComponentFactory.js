Ext.define('Doc.utils.ComponentFactory', {
    singleton: true,
    createStore: function(config, storeId){
        var componentType = config.schema.hasOwnProperty('tree') ? 'tree' : 'grid',
            fields = config.schema[componentType],
            data = config.data[componentType],
            meta = {
                fields: fields.map(function(field){
                    return {name: field.dataIndex}
                }),
                data: data,
                autoLoad: false
            };
        if (storeId) meta.storeId = storeId;
        return Ext.create(
            (componentType == 'tree') ? 'Ext.data.TreeStore' : 'Ext.data.Store',
            meta
        );
    },
    createColumns: function(config ){
        var componentType = config.schema.hasOwnProperty('tree') ? 'tree' : 'grid',
            columns = config.schema[componentType],
            columnConf = [];



        columns.forEach(function(column){
            if (column.hasOwnProperty('header') || column.hasOwnProperty('text')){
                if (column.dataIndex.indexOf(".") > -1) {
                    column.renderer = function(value){
                        return value.task;
                    };
                    column.dataIndex = 'product';

                }
                columnConf.push(column);
            }
        });

        return columnConf;
    }
});