Ext.define('JC.view.PaymentTotals', {
    extend: 'Ext.container.Container',
    alias: 'widget.PaymentTotals',
    tpl: new Ext.XTemplate(
        '<div>',
        '   <tpl for="."><span style="font-size:11px;"> {group}:  {total:number("0,0.00")} | </span></tpl>',
        '</div>'
    )
})