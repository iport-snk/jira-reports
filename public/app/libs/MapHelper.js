Ext.define("NDM.libs.MapHelper", {
    singleton: true,
    ymap: {},
    addMarkerBtn: {},
    addLineBtn: {},

    createObject: function(type, name, coords) {
        if(type == 'placemark') this.createPlacemark(coords[0], name);
        else if(type == 'polyline')  this.createPolyline(coords, name, false);
    },
    createPlacemark: function(coords, name) {

        var placemark = new ymaps.Placemark(coords, {
            iconContent: name
        }, {
            preset: "islands#blueStretchyIcon",
            draggable: "true"
        });
        this.ymap.geoObjects.add(placemark);
        return placemark;
    },
    createPolyline: function(coords, name, editable){
        var polyline = new ymaps.Polyline(coords, {}, {
            // Задаем опции геообъекта.
            // Цвет с прозрачностью.
            strokeColor: "#00000088",
            // Ширину линии.
            strokeWidth: 2,
            // Максимально допустимое количество вершин в ломаной.
            editorMaxPoints: 999999
        });
        this.ymap.geoObjects.add(polyline);
        if (editable) {
            polyline.editor.startEditing();
            polyline.editor.startDrawing();
        }

        polyline.events.add('editorstatechange',function(){
            if (this.polyline.editor.state.get('editing')) {
                this.polyline.editor.stopEditing();
                this.self.addLineBtn.deselect();

                var coords = this.polyline.geometry.getCoordinates();
                this.self.openBaloon(coords[coords.length - 1], polyline);
            }
        }, {polyline: polyline, self: this});
        return polyline;
    },
    openBaloon: function(coords, _opener){
        var helper = this,
            map = this.ymap;
        if (!this.ymap.balloon.isOpen()) {
            //if (_opener) this.ymap.balloon._opener = _opener;
            this.ymap.balloon.events.add('close', function(){
                Ext.getCmp('extBaloon').close();
            });
            this.ymap.balloon.open(coords, {
                contentBody: '<div id="geoobject-baloon" style="width:400px;height:400px;"></div>'
            }).then(function(){
                var ctx = this;
                form = Ext.create('Ext.form.Panel', {
                    id: 'extBaloon',
                    height: 400,
                    border: false,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [{
                        xtype: 'textfield',
                        margin: '0 5 0 0',
                        name: 'name',
                        fieldLabel: 'Name'
                    }, {
                        xtype: 'textareafield',
                        margin: '0 5 0 0',
                        fieldLabel: 'Description',
                        flex: 1
                    }],
                    buttons: [{
                        margin: '0 20 0 0',
                        text: 'Submit',
                        handler: function(){
                            var form = this.up('form'),
                                name = form.down('[name=name]').getValue(),
                                coords = ctx.panel.ymap.balloon.getPosition();


                            if (ctx.geoObject) {
                                Ext.getStore('GeoObjects').create('polyline', name, ctx.geoObject.geometry.getCoordinates());
                            } else {
                                Ext.getStore('GeoObjects').create('placemark', name, [coords]);
                                ctx.panel.createPlacemark(coords, name);
                            }

                            map.balloon.close();

                        }
                    }]
                }).render(Ext.fly("geoobject-baloon"))

            }, null, null, {panel:helper, geoObject: _opener});
        } else {
            this.ymap.balloon.close();
        }
    },
    initMap: function(panel) {
        if (Ext.isEmpty(ymaps)) return;

        var helper = this,
            ymap = this.ymap = new ymaps.Map (panel.body.el.dom, {
                center: [50.352307, 30.957459],
                zoom: 12,
                controls: ['zoomControl']
            }),
            addMarkerBtn = this.addMarkerBtn = new ymaps.control.Button({
                data: { image: '/css/y-btn-add.png'}
            }),
            addLineBtn = this.addLineBtn = new ymaps.control.Button({
                data: { image: '/css/y-btn-add-line.png'}
            });

        addMarkerBtn.events.add('click', function () {
            addLineBtn.deselect();
        });
        addLineBtn.events.add('select', function () {
            addMarkerBtn.deselect();
            var polyline = helper.createPolyline([], null, true);
        }, addLineBtn);

        ymap.controls.add(addMarkerBtn);
        ymap.controls.add(addLineBtn);

        ymap.events.add('click', function (e) {
            var coords = e.get('coords'),
                map = e.get('map');

            if (this.markerBtn.isSelected()) {
                helper.openBaloon(coords);
            } else if (this.lineBtn.isSelected()){

            }
        }, {markerBtn: addMarkerBtn, lineBtn: addLineBtn});

        panel.on('resize', function(){
            ymap.container.fitToViewport()
        });
        this.loadGeoObjects();


    },
    loadGeoObjects: function(){
        var self = this;
        Ext.getStore('GeoObjects').loadDfData().then(function(records){
            records.forEach(function(item){
                item.__geo_object = self.createObject(item.type, item.name, item.coords)
            })
        });

       Ext.getStore('NDUsers').loadDfData({params: [{name: "region", value: "11"}]}).then(function(users){
            var cntr = 0;
            users.forEach(function(item){
                var street = item.street,
                    building = item.building;

                if (Ext.isEmpty(item.pos)) return;

                var coords = item.pos.split(' ');
                self.createObject('placemark', item.contract, [[coords[1], coords[0]]]);
                cntr ++;
                console.log(item);
                /*if (Ext.isEmpty(item.get('description'))) {
                    ymaps.geocode(item.data.address + ',' + building, {json: true}).then(function (res) {
                        var pos = res.GeoObjectCollection.featureMember[0].GeoObject.Point.pos,
                            lowerCorner = res.GeoObjectCollection.featureMember[0].GeoObject.boundedBy.Envelope.lowerCorner,
                            upperCorner = res.GeoObjectCollection.featureMember[0].GeoObject.boundedBy.Envelope.upperCorner,
                            name = res.GeoObjectCollection.featureMember[0].GeoObject.name,
                            description = res.GeoObjectCollection.featureMember[0].GeoObject.description;

                        var coords = res.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(" ");
                        Ext.getStore('GeoObjects').savePosition({
                            streetId: street,
                            building: building,
                            pos: pos,
                            upperCorner: upperCorner,
                            lowerCorner: lowerCorner,
                            description: description,
                            name: name
                        });
                        // Выведем в консоль данные, полученные в результате геокодирования объекта.
                        console.log(coords);
                    })

                }
                */


            });
        })

    }

});