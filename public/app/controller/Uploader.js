Ext.define('TB.controller.TradeImportWindow', {
    extend: 'Ext.app.Controller',
    requires: ['TB.utils.AppHelper'],
    refs: [
        {
            ref: 'TradeImportWindow',
            selector: 'TradeImportWindow'
        }
    ],

    init: function () {
        var self = this;
        self.control({
            'TradeImportWindow': {
                afterrender: function () {
                    var dropbox = document.getElementById("tradeImportWindow-body");
                    dropbox.addEventListener("dragenter",
                        function (evt) {
                            evt.stopPropagation();
                            evt.preventDefault();
                        }, false);
                    dropbox.addEventListener("dragexit",
                        function (evt) {
                            evt.stopPropagation();
                            evt.preventDefault();
                        }, false);
                    dropbox.addEventListener("dragover",
                        function (evt) {
                            evt.stopPropagation();
                            evt.preventDefault();
                        }, false);
                    dropbox.addEventListener("drop",
                        function (evt) {
                            evt.stopPropagation();
                            evt.preventDefault();
                            var files = evt.dataTransfer.files;
                            var count = files.length;
                            if (count > 0) {
                                file = files[0];
                                self.getTradeImportWindow().down('#fileName').setValue(file.name);
                                self.getTradeImportWindow().uploadFile = file;
                                self.getTradeImportWindow().down('button[cls=upload-btn btn-size-small]').enable();

				var formData = new FormData();
                                for(i=0; i<count; i++) {
                                    formData.append('file_' + i, files[i].file, files[i].name);
                                }
                            }
                        }, false);
                }
            },
            'TradeImportWindow button[cls="upload-btn btn-size-small"]': {
                click: function () {
                    self.UploadFile();
                }
            },
            'TradeImportWindow filefield': {
                change: function (o) {
                    var file = $('input[type=file]', o.getEl)[0].files[0];
                    self.getTradeImportWindow().down('#fileName').setValue(file.name);
                    self.getTradeImportWindow().uploadFile = file;
                    if (!Ext.isEmpty(self.getTradeImportWindow().down('#fileName').value)) {
                        self.getTradeImportWindow().down('button[cls=upload-btn btn-size-small]').enable();
                    } else {
                        self.getTradeImportWindow().down('button[cls=upload-btn btn-size-small]').disable();
                    }
                }
            }
        });
        self.callParent(arguments);
    },
    UploadFile: function () {
        var file = this.getTradeImportWindow().uploadFile
        if (file) {
            var mask = new Ext.LoadMask(Ext.getBody(), {msg:"Please wait..."});
            mask.show();
            $.ajax({
                type: "POST",
                beforeSend: function (request) {
                    request.setRequestHeader("Content-Type", file.type);
                },
                url: contextPath + "/rest/util/tradeUpload",
                data: file,
                processData: false,
                contentType: false,
                success: function (data) {
                    mask.hide();
                    Ext.getCmp('uploadedFileResults').update('Success: ' + 'Your file "' + file.name + '" has been uploaded.');
                },
                error: function (data) {
                    mask.hide();
                    var obj = Ext.decode(data.responseText);
                    Ext.getCmp('uploadedFileResults').update(obj.message);
                }
            });
        }
    }
})
