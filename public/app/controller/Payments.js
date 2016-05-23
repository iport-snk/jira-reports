Ext.define('JC.controller.Payments', {
    extend: 'Ext.app.Controller',
    refs: [
        {ref: 'Payments', selector: 'Payments'},
        {ref: 'Period', selector: 'Payments #periodSelector'},
        {ref: 'PaymentType', selector: 'Payments #paymentType'},
        {ref: 'B1', selector: 'Payments #loadGridBtn'},
        {ref: 'B2', selector: 'Payments #loadXlsBtn'},
        {ref: 'Footer', selector: 'Payments PaymentTotals'}
    ],
    listen: {
        store: {
            '#Payments' : {
                load: 'onStoreLoad'
            }
        }
    },
    control: {
        'Payments #loadXlsBtn' : {
            click: 'downloader'
        },
        'Payments #loadGridBtn' : {
            click: 'loadGrid'
        },
        'Payments #periodSelector' : {
            change: 'setBtnAvailability'
        }

    },

    loadGrid: function(){
        Ext.getStore('Payments').load({
            params: this.getParams()
        });
    },

    getParams: function(){
        var paymentTypesArr = this.getPaymentType().getValue(),
            params = {
                period: this.getPeriod().getValue()
            };
        if (paymentTypesArr.length > 0) {
            params.paymentTypes =  paymentTypesArr.reduce(function(prev, value){
                return prev + "," + value ;
            })
        }
        params.reportName = params.period.replace("-","");
        if (params.paymentTypes) {
            params.reportName += '-' + params.paymentTypes.replace(/'/g,"").replace(",", "-");
        }
        return params;
    },

    downloader: function () {
        var params = this.getParams();

        var form = $("<form>").attr({
            target: '_BLANK',
            action: '/bill/payments',
            method: 'get'
        }).css({display: 'none'});
        form.append($("<input>").attr({name: 'period', value: params.period}));
        if (params.paymentTypes) form.append($("<input>").attr({name: 'paymentTypes', value: params.paymentTypes}));
        form.append($("<input>").attr({name: 'reportType', value: 'excel'}));
        form.append($("<input>").attr({name: 'name', value: params.reportName}));
        form.appendTo($("body"));
        form.submit();
        window.setTimeout(function () {form.remove();}, 10000);
    },
    setBtnAvailability: function(combo, value){
        this.getB1().disable();
        this.getB2().disable();
        try {
            var period = value.split('-');
            if (Ext.isNumeric(period[0]) && Ext.isNumeric(period[1]) && period[0].length == 4 && period[1].length == 2) {
                this.getB1().enable();
                this.getB2().enable();
            }
        } catch(err) {

        }
    },
    onStoreLoad: function(store){
        var providers = store.proxy.reader.rawData.byProvider,
            payments = store.proxy.reader.rawData.byPaymentType;

        this.getFooter().update(payments);
    }

});