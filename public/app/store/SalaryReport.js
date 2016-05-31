Ext.define('JC.store.SalaryReport', {
    extend : 'Ext.data.Store',
    fields: [
        {name: 'employee_type'},
        {name: 'employee'} ,
        {name: 'issue'},
        {name: 'issuetype'},
        {name: 'type_name'},
        {name: 'issuestatus'},
        {name: 'status_name'},
        {name: 'original_estimate'},
        {name: 'time_spent'},
        {name: 'sprint_id'},
        {name: 'sprint_name'},
        {name: 'created', type: 'date'},
        {name: 'resolutiondate', type: 'date'}
    ],
    groupField: 'sprint_id',
    storeId: 'SalaryReport',
    proxy: {
        type: 'ajax',
        url: '/salary-report/',
        reader: {
            type: 'json'
        }
    },
    autoLoad: false
});