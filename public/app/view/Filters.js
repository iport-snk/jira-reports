Ext.define('JC.view.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.Filters',
    layout: 'form',
    items: [{
        xtype: 'fieldcontainer',
        items: [{
            xtype: 'segmentedbutton',
            allowMultiple: true,
            items: [{
                text: 'Новые',
                pressed: true
            }, {
                text: 'В работе'
            }, {
                text: 'Выполненные',
                pressed: true
            }]
        }]
    },{
        xtype: 'fieldcontainer',
        items: [{
            xtype: 'segmentedbutton',
            allowMultiple: true,
            items: [{
                text: 'Ремонты',
                pressed: true
            }, {
                text: 'Подключения'
            }, {
                text: 'Задачи',
                pressed: true
            }]
        }]
    },{
        xtype: 'tagfield',
        store: 'Labels',
        reference: 'labels',
        displayField: 'label',
        valueField: 'label',
        filterPickList: true,
        queryMode: 'local',
        publishes: 'value',
        flex: 1
    }]
});