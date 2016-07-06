Ext.define('JC.view.SalaryReport', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.SalaryReport',
    store: 'SalaryReport',
    tbar: [{
        xtype: 'combo',
        itemId: 'employeeSelector',
        fieldLabel: 'Работник',
        store: Ext.create('Ext.data.Store',{
            fields: ['code', 'type', 'name'],
            proxy: {
                type: 'ajax',
                url: '/sprints/employee',
                reader: {type: 'json'}
            },
            autoLoad: false
        }),
        queryMode: 'local',
        displayField: 'name',
        valueField: 'code',
        width: 350
    },{
        xtype: 'button',
        text: 'Обновить',
        itemId: 'refreshBtn'
    }],
    workFormatter: function(){
        return 's'
    },
    statics: {workRenderer: function(value, metaData, record, rowIdx, colIdx, store, view){
        if (value == 0) {
            return '';
        } else {
            return Ext.util.Format.number(value, '0.00');
        }
    }},
    features: [{
        id: 'group',
        ftype: 'groupingsummary',
        groupHeaderTpl: Ext.create('Ext.XTemplate',
            '{rows:this.formatGroup}',
            {
                formatGroup: function(rows) {
                    var row = rows[0].data;
                    return row.sprint_name + " [" + Ext.util.Format.date(row.sprint_start_date, "d.m.Y") + ' - ' + Ext.util.Format.date(row.sprint_end_date, "d.m.Y") + "]";
                }
            }
        ),
        hideGroupedHeader: true,
        enableGroupingMenu: true
    }, {
        ftype: 'summary',
        dock: 'bottom'
    }],
    columns: [{
        header: 'Выполнено',
        dataIndex: 'resolutiondate',
        formatter: 'date("d.m.Y")'
    },{
        header: 'issue',
        dataIndex: 'issue',
        xtype: 'templatecolumn',
        tpl: new Ext.XTemplate(
            '<a href="http://df.fun.co.ua:8080/browse/{issue}" ' +
                'target="_blank" ' +
                'data-qtip="Начальная оценка: {estimate} {unit}">' +
                '{issue}' +
            '</a>'
        )


    },{
        header: 'type_name',
        dataIndex: 'type_name',
        renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
            return value == 0 ? '' : value + ' (' + record.get('unit') + ')';
        },
        width: 200
    },{
        header: 'Часы',
        dataIndex: 'workHrs',
        align: 'right',
        renderer: JC.utils.Format.moneyFormatter,
        summaryRenderer: JC.utils.Format.moneyFormatter,
        summaryType: 'sum'
    },{
        header: 'Подкл.',
        dataIndex: 'workConn',
        align: 'right',
        renderer: JC.utils.Format.numberFormatter,
        summaryRenderer: JC.utils.Format.numberFormatter,
        summaryType: 'sum'
    },{
        header: 'Магистр.',
        dataIndex: 'workCbl',
        align: 'right',
        renderer: JC.utils.Format.numberFormatter,
        summaryRenderer: JC.utils.Format.numberFormatter,
        summaryType: 'sum'
    },{
        header: 'rate',
        dataIndex: 'rate',
        align: 'right',
        renderer: JC.utils.Format.moneyFormatter
    },{
        header: 'cost',
        dataIndex: 'cost',
        align: 'right',
        renderer: JC.utils.Format.moneyFormatter,
        summaryRenderer: JC.utils.Format.moneyFormatter,
        summaryType: 'sum'
    }],
    viewConfig: {
        stripeRows: false,
        getRowClass: function(record) {
            if (record.get('estimate') < record.get('work')) return  'red-row';
        }
    }
});