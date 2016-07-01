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
            render: 'onDocRender'
        }
    },
    onESelect: function(combo){
        var empl = combo.getValue(),
            me = this;
        Ext.Ajax.request({url: '/sprints/due?employer=' + empl}).then(function(response){
            var data = Ext.decode(response.responseText);
            me.getSCombo().clearValue();
            me.getSCombo().store.loadData(data);
        })
    },
    onDocRender: function(grid){
        var me = this,
            doc = me.getDoc();

        Ext.Promise.all([
            Ext.Ajax.request({url: '/sprints/due?employer=' + doc.record.employer}),
            Ext.Ajax.request({url: '/sprints/employee'}),
            Ext.Ajax.request({url: '/sprints/payed?doc=' + doc.record.id})
        ]).then(function(rs){
            var ds = rs.map(function(item){
                return Ext.decode(item.responseText);
            });
            me.getSCombo().store.loadData(ds[0]);
            me.getECombo().store.loadData(ds[1]);
            doc.getForm().setValues(ds[2]);
        })
    }
});