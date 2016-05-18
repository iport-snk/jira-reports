Ext.define('JC.controller.SalaryReport', {
    extend: 'Ext.app.Controller',
    refs: [{
        ref: 'SalaryReport',
        selector: 'SalaryReport'
    }],
    config: {
        listen: {
            store: {
                '#SalaryReport' : {
                    load: function(store) {
                        var grid = this.getSalaryReport();
                        grid.reconfigure(store);
                    }
                }
            }
        },
        control: {
            'SalaryReport #employeeSelector' : {
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
