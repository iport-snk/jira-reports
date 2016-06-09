Ext.define('Doc.utils.StoreManager', {
    singleton: true,
    getStore: function(uri) {
        var deferred = new Ext.Deferred(),
            store = Ext.getStore(uri);

        if (store) {
            deferred.resolve(store);
        } else {
            Ext.Ajax.request({
                url: uri
            }).then(function(response, opts) {
                var doc =  Ext.decode(response.responseText),
                    columns = Doc.utils.ComponentFactory.createColumns(doc),
                    store = Doc.utils.ComponentFactory.createStore(doc, uri);

                store.columns = columns;
                deferred.resolve(store);
            });
        }
        return deferred.promise;
    }
});