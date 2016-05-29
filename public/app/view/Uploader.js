Ext.define('TB.view.tradeImport.TradeImportWindow', {
    extend: 'framework.component.FrameworkPopup',
    alias: 'widget.TradeImportWindow',
    id: 'tradeImportWindow',
    title: 'Trade Import',
    autoShow: true,
    modal: true,
    closeAction: 'destroy',
    resizable: false,
    draggable: true,
    width: 400,
    height: 200,
    minWidth: 400,
    minHeight: 300,
    constrain: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'form',
            style: {
                margin: '3px',
                padding: '10px',
                border:'1px dashed #d3d3d3'
            },
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        pack: 'start'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'fileName',
                            fieldLabel: 'File',
                            labelWidth: 20,
                            flex: 1,
                            readOnly: true
                        },
                        {
                            xtype: 'filefield',
                            name: 'file',
                            buttonText: 'Browse',
                            cls : 'btn-size-small',
                            padding: '0 8px 0 5px',
                            buttonOnly: true
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },

                    items: [
                        {
                            xtype: 'button',
                            text: 'Upload',
                            cls: 'upload-btn btn-size-small',
                            margin: '5px 0 0 0',
                            disabled: true
                        }
                    ]
                },
                {
                    xtype: 'box',
                    autoEl: {
                        tag: 'hr',
                        style: {
                            'background-color': '#656565',
                            height: '1px',
                            border: '0',
                            margin: '15px 0 15px 0'
                        }
                    }
                },
                {
                    xtype: 'text',
                    text: 'Results: ',
                    style: {
                        margin: '0 0 15px 0'
                    }
                },
                {   xtype: "panel",
                    flex: 1,
                    height: 100,
                    overflowY: 'auto',
                    scroll: "vertical",
                    id: 'uploadedFileResults'
                }
            ]
        }
    ],
    fbar: [
        {
            xtype: 'button',
            text: 'Close',
            id: 'TB-TradeImportWindow-Close-button',
            cls: 'close-btn btn-size-small',
            handler: function (btn) {
                btn.up('window').close();
            }
        }
    ]
})