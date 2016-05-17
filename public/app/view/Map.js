Ext.define('NDM.view.Map', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.Map',
    //title: 'Map',
    height: 100,
    initMap: function() {

    },
    listeners: {
        afterrender: function(panel) {
            panel.ymap = NDM.libs.MapHelper.initMap(panel);


        }
    }
})