Ext.define('JC.controller.SalaryReport', {
    extend: 'Ext.app.Controller',
    refs: [{
        ref: 'SalaryReport',
        selector: 'SalaryReport'
    }],
    config: {
        control: {
            'SalaryReport #employeeSelector' : {
                render: function(combo){
                    combo.store.load();
                },
                change: function(combo, value){
                    var record = combo.getSelectedRecord(),
                        ctrl = this;
                    Ext.getStore('SalaryReport').load({
                        params: {employee: record.get('employee'), employeeType: record.get('employee_type')}
                    });

                }
            }
        }
    }

});
