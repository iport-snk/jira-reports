Ext.define('JC.controller.CashList', {
    extend: 'Ext.app.Controller',
    refs: [
        {ref: 'Grid', selector: 'CashList'},
        {ref: 'BO', selector: 'CashList #btnOpen'},
        {ref: 'BD', selector: 'CashList #btnDel'}
    ],
    listen: {
        store: {
            '#CashList' : {
                load: 'onStoreLoad'
            }
        }
    },
    control: {
        'CashList #btnIncome' : {
            click: 'addIncome'
        },
        'CashList #btnOutcome' : {
            click: 'addOutcome'
        },
        'CashList #btnOpen' : {
            click: 'openDoc'
        },
        'CashList #btnDel' : {
            click: 'delDoc'
        },
        'CashList' : {
            selectionchange : 'onSelCh',
            render: 'onGridRender',
            rowdblclick: 'openDoc'
        }

    },

    loadGrid: function(){
        Ext.getStore('Payments').load({
            params: this.getParams()
        });
    },

    onSelCh: function(grid, selected) {
        this.setBtnAvailability(selected)
    },

    setBtnAvailability: function(selected){
        if (selected.length > 0) {
            this.getBO().enable();
            this.getBD().enable();
        } else {
            this.getBO().disable();
            this.getBD().disable();
        }

    },
    addIncome: function() {
        Ext.create({
            xtype: 'CashIncome'
        }).show();
    },
    addOutcome: function() {
        var record = Ext.create('JC.model.Salary',{
            id: 0,
            date: new Date()
        });
        Ext.create({
            xtype: 'CashOutcome',
            record: record
        }).show();
    },
    delDoc: function() {
        var record = this.getGrid().getSelection()[0],
            store = this.getGrid().store;

        Ext.Msg.confirm('', 'Подтвердите удаление выбранных документов',
            function(decision) {
                if (decision == 'yes') {

                    Ext.Ajax.request({
                        url: '/sprints/payment/' + record.get('id'),
                        method: 'DELETE'
                    }).then(function(response){
                        store.remove(record);
                    });
                }
            }
        )
    },
    openDoc: function() {
        var record = this.getGrid().getSelection()[0];

        Ext.create({
            xtype: 'CashOutcome',
            record: record
        }).show();

    },
    onStoreLoad: function(store){
        //this.getFooter().update(store.proxy.reader.rawData.totals);
    },
    onGridRender: function(grid){
        grid.store.load();
    }

});