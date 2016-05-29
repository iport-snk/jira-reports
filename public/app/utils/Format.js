Ext.define('JC.utils.Format', {
    singleton: true,
    numberFormatter: function(value, metaData, record, rowIdx, colIdx, store, view) {
        return (value == 0 ) ? '' : value;
    },
    moneyFormatter: function(value, metaData, record, rowIdx, colIdx, store, view){
        return (value == 0 ) ? '' : Ext.util.Format.number(value, '0.00');
    }
})
