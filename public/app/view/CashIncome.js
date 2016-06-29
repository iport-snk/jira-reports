Ext.define('JC.view.CashIncome', {
    extend: 'Ext.form.Panel',
    alias: 'widget.CashIncome',
    title: 'Приходный Ордер',
    frame: true,
    bodyPadding: 5,
    width: 550,
    floating: true,
    modal: true,
    // Fields will be arranged vertically, stretched to full width
    items: [{
        xtype: 'datefield',
        format: "d.m.Y H:i:s",
        name: 'date',
        fieldLabel: 'Time In',
        anchor: '100%'
    },{
        xtype: 'numberfield',
        fieldLabel: 'Сумма',
        anchor: '100%',
        name: 'amount',
        allowBlank: false
    },{
        xtype: 'textfield',
        anchor: '100%',
        fieldLabel: 'Last Name',
        name: 'reason',
        allowBlank: false
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
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.msg);
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result.msg);
                    }
                });
            }
        }
    }],
    listeners: {
        afterrender: function(){
            this.getForm().setValues(this.record);
        }
    }

});