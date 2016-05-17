Ext.define('JC.view.TaskRow', {
    extend: 'Ext.container.Container',
    alias: 'widget.TaskRow',
    //title: 'Map',
    height: 55,
    layout: {
        type: 'hbox',
        //pack: 'start',
        //align: 'stretch'
    },
    items: [{
        xtype: 'container',
        itemId: 'phSummary',
        padding: 4,
        tpl:
            '' +
            '<div style="background:url(/css/icons/priorities/{priority}.png) no-repeat -3px 0px;position:relative;height:16px;">' +
                '<div style="background:url({issueTypeIcon}) no-repeat left top; position: absolute;left:14px;width:16px;">&nbsp;</div>' +
                '<div style="position: absolute;left:36px; top:1px;">{issue} {labels} {duedate}</div>' +
            '</div>' +
            '<div style="padding-top:4px;width:100%;white-space:normal;word-wrap:normal!important;">{summary}</div>',
        flex:1
    }],
    defaultBindProperty: 'value',
    setValue:function(text){
        var btn = this.down('button#btnIssue'),
            phSummary = this.down('container#phSummary'),
            record = this.up('grid').store.findRecord('issue', text),
            issuetype = record.get('issuetype'),
            issuestatus = record.get('issuestatus');
        //btn.setText(text);
        //btn.setIcon(this.getIcon(issuetype));
        phSummary.setData({
            issueTypeIcon: this.getIcon(record.get('issuetype')),
            issue: issuestatus == 10001 ? '<del>' + record.get('issue') + '</del>' : record.get('issue'),
            summary: record.get('summary'),
            description: record.get('description'),
            priority: record.get('priority_name'),
            labels: Ext.isEmpty(record.get('labels')) ? '' : ' : ' + record.get('labels'),
            duedate: Ext.isEmpty(record.get('duedate')) ? '' : ' : ' + Ext.util.Format.date(record.get('duedate'),"d.m.y")
        });

    },

    initComponent: function() {
        this.callParent();
    },
    getIcon: function(issuetype){
        switch(issuetype) {
            case '10000': // 'Epic':
                return "/css/icons/issuetypes/epic.png";
            case '10002': // 'Task':
                return "/css/icons/issuetypes/task.png";
            case '10003': //'Sub-task':
                return "/css/icons/issuetypes/subtask.png";
            case '10004': //'Bug'
                return "/css/icons/issuetypes/bug.png";
            case '10100': //'Подключение'
                return "/css/icons/issuetypes/feedback.png";
        }
    }
})