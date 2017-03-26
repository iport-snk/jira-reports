Ext.define('JC.controller.SalaryReport', {
    extend: 'Ext.app.Controller',
    refs: [
        {ref: 'SalaryReport', selector: 'SalaryReport'},
        {ref: 'Employer', selector: 'SalaryReport #employeeSelector'}
    ],

    control: {
        'SalaryReport #refreshBtn': {
            click: 'loadGrid'
        },
        'SalaryReport #employeeSelector': {
            render: function (combo) {
                combo.store.load();
            },
            change: 'loadGrid'
        }
    },
    loadGrid: function() {
        var record = this.getEmployer().getSelectedRecord();

        Ext.getStore('SalaryReport').load({
            params: {employee: record.get('code'), employeeType: record.get('type'), position: record.get('position'), commission: record.get('commission')}
        });
    }


});
