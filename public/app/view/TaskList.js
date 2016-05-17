Ext.define('JC.view.TaskList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.TaskList',
    plugins: 'gridfilters',
    store: 'Issues',
    columns: [{
        header: 'issue',
        dataIndex: 'issue',
        xtype: 'templatecolumn',
        tpl: new Ext.XTemplate(
            '<div style="background:url(/css/icons/priorities/{priority_name}.png) no-repeat -3px 0px;position:relative;height:16px;">' +
            '   <div style="background:url(/css/icons/issuetypes/{[this.getIssueTypeName(values.issuetype)]}.png) no-repeat left top; position: absolute;left:14px;width:16px;">&nbsp;</div>' +
            '   <div style="position: absolute;left:36px; top:1px;">{[this.formatIssue(values)]} {labels} {duedate:date("[d.m.Y]")}</div>' +
            '</div>' +
            '<div style="padding-top:4px;width:100%;white-space:normal;word-wrap:normal!important;height:32px;">{summary}</div>',
            {
                getIssueTypeName: function(issuetype){
                    switch(issuetype) {
                        case '10000': return "epic";
                        case '10002': return "task";
                        case '10003': return "subtask";
                        case '10004': return "bug";
                        case '10100': return "feedback";
                    }
                },
                formatIssue: function(record) {
                    return record.issuestatus == 10001 ?
                        '<del>' + record.issue + '</del>' :
                        record.issue;
                }
            }
        ),
        flex: 1
    }],
    listeners: {
        itemdblclick: function(grid, record){
            var win = new Ext.Window({
                title: record.get('issue'),
                scrollbars: 1,
                layout: 'fit',
                closeAction: 'destroy',
                maximized: true,
                scope: this,
                items: []
            });
            win.show(this);
        }
    }
});