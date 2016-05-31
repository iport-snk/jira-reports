Ext.define('JC.view.Payments', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.Payments',
    requires: ['Ext.grid.filters.Filters'],
    plugins: 'gridfilters',
    stateId: 'stateful-payments-grid',
    store: Ext.create('Ext.data.Store', {
        storeId: 'Payments',
        fields: [
            {name: 'cash'},
            {name: 'payment_date', type: 'date'},
            {name: 'reason'},
            {name: 'coment'},
            {name: 'category'},
            {name: 'contract'},
            {name: 'provider_name'},
            {name: 'payment_type'}
        ],
        proxy: {
            type: 'ajax',
            url: '/bill/payments',
            reader: {
                type: 'json',
                rootProperty: 'records',
                keepRawData: true
            }
        },
        autoLoad: false
    }),
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
    fbar:[{
        xtype: 'PaymentTotals',
        flex: 1
    }],
    tbar: [{
        xtype: 'combo',
        itemId: 'periodSelector',
        fieldLabel: 'Период',
        labelWidth: 60,
        emptyText: 'Период',
        store: Ext.create('Ext.data.Store',{
            fields: ['period'],
            proxy: {
                type: 'ajax',
                url: '/bill/periods',
                reader: {type: 'json'}
            },
            autoLoad: true
        }),
        queryMode: 'local',
        displayField: 'period',
        valueField: 'period'
    },{
        xtype: 'tagfield',
        itemId: 'paymentType',
        fieldLabel: 'Способ',
        labelWidth: 60,
        store: Ext.create('Ext.data.Store',{
            fields: [{name: 'label'}],
            data: [
                {v: "'24NS'", t: "24NS"},
                {v: "'LP'", t: "LP"},
                {v: "'PLATON'", t: "PLATON"},
                {v: "'WIRE'", t: "WIRE"},
                {v: "'BNK'", t: "BNK"},
                {v: "'MDF'", t: "MDF"},
                {v: "'CASH'", t: "CASH"}
            ]
        }),
        displayField: 't',
        valueField: 'v',
        filterPickList: true,
        queryMode: 'local',
        flex: 1
    }, {
        text: 'Посмотреть',
        itemId: 'loadGridBtn',
        disabled: true
    }, {
        text: 'Загрузить .xlsx',
        itemId: 'loadXlsBtn',
        disabled: true
    }, {
        text: 'Очистить фильтр',
        tooltip: 'Clear all filters',
        itemId: 'clearFilter',
        handler: function () {
            this.up('grid').filters.clearFilters();
        }
    }],

    columns: [{
        header: 'Дата',
        dataIndex: 'payment_date',
        xtype: 'datecolumn',
        width: 160,
        format:'Y-m-d h:m:s'
    },{
        header: 'Коментарий',
        dataIndex: 'reason',
        flex: 1
    },{
        header: 'Сумма',
        dataIndex: 'cash',
        align: 'right',
        xtype: 'numbercolumn',
        format:'0.00',
        summaryType: 'sum',
        summaryRenderer: function(value, summaryData, dataIndex) {
            return value == 0 ? '' : Ext.util.Format.number(value, '0.00');
        }
    },{
        header: 'Договор',
        dataIndex: 'contract',
        filter: 'string'
    },{
        header: 'Провайдер',
        dataIndex: 'provider_name',
        filter: 'list'
    },{
        header: 'Способ',
        dataIndex: 'payment_type',
        filter: 'list'
    }]
});