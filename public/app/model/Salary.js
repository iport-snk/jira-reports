Ext.define('JC.model.Salary', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id'},
        {name: 'amount'},
        {name: 'date', type: 'date'},
        {name: 'employer'},
        {name: 'comment'},
        {name: 'sprints'}
    ]
});