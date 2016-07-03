Ext.define('JC.controller.CashOutcome', {
    extend: 'Ext.app.Controller',
    refs: [
        {ref: 'Doc', selector: 'CashOutcome'},
        {ref: 'SCombo', selector: 'CashOutcome [name="sprints"]'},
        {ref: 'ECombo', selector: 'CashOutcome [name="employer"]'}
    ],
    control: {
        'CashOutcome [name="employer"]' : {
            select: 'onESelect'
        },
        'CashOutcome' : {
            beforeshow : 'onShow'
        }
    },
    onESelect: function(combo){
        var empl = combo.getValue(),
            doc = this.getDoc(),
            docId = doc.record ? doc.record.id : null,
            me = this;
        me.getSCombo().store.removeAll();
        Ext.Ajax.request({url: '/sprints/due/' + empl + '/' + docId}).then(function(response){
            var data = Ext.decode(response.responseText);
            me.getSCombo().enable();
            me.getSCombo().clearValue();
            me.getSCombo().store.loadData(data);
        })
    },
    onShow: function(grid){
        var doc = this.getDoc();

        this.getSCombo().store.removeAll();
        this.getSCombo().disable();
        this.getECombo().store.loadData(JC.app.employee);

        if (doc.record) this.loadForm(doc.record);

    },

    loadForm: function(record) {
        var me = this,
            doc = me.getDoc();
        Ext.Ajax.request({url: '/sprints/due/' + record.employer + '/' + record.id}).then(function(rs){
            var ds =  Ext.decode(rs.responseText);
            me.getSCombo().enable();
            me.getSCombo().store.loadData(ds);
            doc.getForm().loadRecord(doc.record);
        })
    }
});