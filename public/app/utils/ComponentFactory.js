Ext.define('JC.utils.ComponentFactory', {
    singleton: true,
    createStore: function(documentType, id){

        var fields = this.createComponents(documentType, 'grid', function(config){
            return {name: config.dataIndex}
        });
        return Ext.create('Ext.data.Store', {
            fields: fields,
            autoLoad: false
        });
    },
    createFields: function(documentType) {
        return this.createComponents(documentType, 'form', function(config){
            return config
        });
    },
    createColumns: function(documentType){
        return this.createComponents(documentType, 'grid', function(config){
            return config
        })
    },
    createComponents: function(componentType, componentGroup, factoryFn){
        var items = [],
            store = Ext.getStore('Fields');

        store.clearFilter();
        store.filter([
            {property: 'component', value: componentType},
            {property: 'group', value: componentGroup}
        ]);
        store.each(function(item){
            items.push(factoryFn(item.get('configuration')));
        });
        return items;
    }
});