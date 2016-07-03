Ext.define('JC.view.CashOutcome', {
    extend: 'Ext.form.Panel',
    alias: 'widget.CashOutcome',
    title: 'Расходный Ордер',
    frame: true,
    bodyPadding: 5,
    width: 550,
    floating: true,
    modal: true,
    url: 'sprints/payment',
    // Fields will be arranged vertically, stretched to full width
    items: [{
        xtype: 'datefield',
        format: "d.m.Y H:i:s",
        name: 'date',
        fieldLabel: 'Дата',
        anchor: '100%'
    },{
        xtype: 'numberfield',
        fieldLabel: 'Сумма',
        anchor: '100%',
        name: 'amount',
        allowBlank: false
    },{
        xtype: 'combobox',
        anchor: '100%',
        fieldLabel: 'Работник',
        store: Ext.create('Ext.data.Store', {
            fields: [{name: 'id'}, {name: 'name' }]
        }),
        name: 'employer',
        allowBlank: false,
        queryMode: 'local',
        displayField: 'name',
        valueField: 'id'
    },{
        xtype: 'tagfield',
        anchor: '100%',
        fieldLabel: 'Спринты',
        store: Ext.create('Ext.data.Store', {
            fields: [{name: 'id'}, {name: 'name' }]
        }),
        name: 'sprints',
        allowBlank: false,
        queryMode: 'local',
        displayField: 'name',
        valueField: 'id',
        filterPickList: true,
        disabled: false
    },{
        xtype : 'textareafield',
        grow : true,
        anchor: '100%',
        fieldLabel: 'Коментарий',
        name: 'comment'

    }],
    buttons: [{
        text: 'Закрыть',
        handler: function() {
            //this.up('form').getForm().reset();

            this.up('panel').close();
        }
    }, {
        text: 'Сохранить',
        formBind: true, //only enabled once the form is valid
        disabled: true,
        handler: function() {
            var doc = this.up('form'),
                form = doc.getForm();


            if (form.isValid()) {

                form.updateRecord();
                //var data = form.getValues();
                //doc.record.set(form.getValues());
                //debugger;
            }
        }
    }]

});