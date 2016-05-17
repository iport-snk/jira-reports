/**
 * The abstract class that add support for the Dream Factory API
 */
Ext.define('NDM.libs.Connection', {
    extend : 'Ext.data.Connection',
    authParams_DF: {
        serviceUrl: 'https://dsp-iport.cloud.dreamfactory.com/',
        credentionals: {email:'oleg.k@iport.net.ua', password: 'Mutabor73'}
    },
    authParams: {
        serviceUrl: 'http://91.226.252.14:8181/',
        credentionals: {email:'oleg.k@iport.net.ua', password: 'Mutabor73'}
    },
    authParams_L: {
        serviceUrl: 'http://localhost:8008/',
        credentionals: {email:'oleg.k@iport.net.ua', password: 'mutabor'}
    },
    auth: function(cb) {
        NDM.Ajax.request({
            url     : 'user/session',
            scope   : this,
            method  : 'POST',
            params  : this.authParams.credentionals,
            success : function(){
                NDM.Ajax.sessionId = arguments[0].session_id;
                NDM.Ajax.ticket = arguments[0].ticket;

                cb();
            },
            failure : function(){
            }
        });
    },
    request: function(config){
        config.url = this.authParams.serviceUrl + 'rest/' + config.url;
        config.original = {
            success : config.success,
            failure : config.failure,
            scope   : config.scope
        };

        if (config.method == 'POST') {
            config.jsonData = config.jsonData || config.params;
            config.params = null;
        }

        config.scope = this;
        config.success = this.handleSuccess;
        config.failure = this.handleFailure;
        config.headers = {
            'X-DreamFactory-Application-Name' : 'iport'
        };

        if (this.sessionId.length > 0) config.headers['X-Dreamfactory-Session-Token'] = this.sessionId;

        if(config.container && config.container.mask){
            config.container.mask({xtype: 'loadmask',message:'Please wait...'});
        }

        this.callParent([config]);
    },

    handleSuccess : function(response,config){
        var data;

        if(config.container && config.container.mask){
            config.container.unmask();
        }

        try{
            data = Ext.decode(response.responseText);
            data.success = true;
        }catch(e){
            this.handleFailure(response,config);
            return false;
        }

        if(config.original.success){
            config.original.success.call(config.original.scope || this,data);
        }
    },

    handleFailure : function(response,config){
        var data;
        if(config.container && config.container.mask){
            config.container.unmask();
        }
        try{
            data = Ext.decode(response.responseText);
            data.success = false;
            data.code = response.status;
        }catch(e){
            data = {success:false,code:response.status,error:[{message:'Something went wrong when connecting with the server.'}]};
        }

        if(config.original.failure){
            config.original.failure.call(config.original.scope || this,data);
        }
    }
},function(){
    NDM.Ajax = Ext.create('NDM.libs.Connection');
    NDM.Ajax.sessionId = '';
});