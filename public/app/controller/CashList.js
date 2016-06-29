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

    },
    delDoc: function() {
        var records = this.getGrid().getSelection(),
            store = this.getGrid().store;

        Ext.Msg.confirm('', 'Подтвердите удаление выбранных документов',
            function(decision) {
                if (decision == 'yes') store.remove(records);
            }
        )
    },
    openDoc: function() {
        var data = this.getGrid().getSelection()[0].getData(),
            docAmount = data.amount < 0 ? data.amount * -1 : data.amount,
            docType = data.amount < 0 ? 'CashOutcome' : 'CashIncome',
            formData = Ext.applyIf({amount: docAmount}, data);

        Ext.create({
            xtype: docType,
            record: formData
        }).show();

    },
    onStoreLoad: function(store){
        //this.getFooter().update(store.proxy.reader.rawData.totals);
    },
    onGridRender: function(grid){
        grid.store.load();
    }

});