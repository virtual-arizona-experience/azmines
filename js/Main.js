function init(){
	var map = new L.Map("map");
	
	/* Tilestream Layer example: */
	var historicUrl = "http://opengis.azexperience.org/tiles/v2/azHistoric1880/{z}/{x}/{y}.png",
		historicLayer = new L.TileLayer(historicUrl, {maxZoom: 10}); 
	
	/* ESRI tiled service example: */
	/* var natGeoLayer = new L.TileLayer.ESRI("http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer");*/
	var worldTransportation = new L.TileLayer.ESRI("http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer");
	var worldImagery = new L.TileLayer.ESRI("http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer");
	var worldBoundaries = new L.TileLayer.ESRI("http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer");
	
	/*set opacity*/
	worldTransportation.setOpacity(0.5)
	worldBoundaries.setOpacity(1)
	
	/* Bing maps example: 
	var bingLayer = new L.TileLayer.Bing(<<Bing Maps API Key>>, "Road"); */
	
	/* WMS layer example: */
	var wmsUrl = "http://opengis.azexperience.org/geoserver/wms",
		wmsLayer = new L.TileLayer.WMS(wmsUrl, { 
			maxZoom: 10, 
			layers: "vae:azmines", 
			format: "image/png", 
			transparent: true 
		}); 
	/**/
	
		var symbolRules = {
		"Copper": new L.Icon({
			iconUrl: "style/images/copper.png",
			iconSize: new L.Point(48,48),
			//shadowUrl: "style/images/azpark-shadow.png",
			//shadowSize: new L.Point(iconHeight * (258/454),iconHeight)
		}),
		
		"Copper, Molybdenum": new L.Icon({
			iconUrl: "style/images/coppermoly.png",
			iconSize: new L.Point(48,48),
			//shadowUrl: "style/images/azpark-shadow.png",
			//shadowSize: new L.Point(iconHeight * (258/454),iconHeight)
		}),
		
		"Gold": new L.Icon({
			iconUrl: "style/images/gold.png",
			iconSize: new L.Point(48,48),
			//shadowUrl: "style/images/azpark-shadow.png",
			//shadowSize: new L.Point(iconHeight * (258/454),iconHeight)
		}),
		
		"Uranium": new L.Icon({
			iconUrl: "style/images/uranium.png",
			iconSize: new L.Point(48,48),
			//shadowUrl: "style/images/azpark-shadow.png",
			//shadowSize: new L.Point(iconHeight * (258/454),iconHeight)
		}),
		
		"Lime": new L.Icon({
			iconUrl: "style/images/lime.png",
			iconSize: new L.Point(48,48),
			//shadowUrl: "style/images/azpark-shadow.png",
			//shadowSize: new L.Point(iconHeight * (258/454),iconHeight)
		}),
		
		"Cement": new L.Icon({
			iconUrl: "style/images/cement.png",
			iconSize: new L.Point(48,48),
			//shadowUrl: "style/images/azpark-shadow.png",
			//shadowSize: new L.Point(iconHeight * (258/454),iconHeight)
		}),
		
		"Coal": new L.Icon({
			iconUrl: "style/images/coal.png",
			iconSize: new L.Point(48,48),
			//shadowUrl: "style/images/azpark-shadow.png",
			//shadowSize: new L.Point(iconHeight * (258/454),iconHeight)
		}),
			
		/*"National Park": new L.Icon({
			iconUrl: "style/images/nps-logo.png",
			iconSize: new L.Point(iconHeight * (265/284), iconHeight),
			//shadowUrl: "style/images/nps-logo-shadow.png",
			//shadowSize: new L.Point(iconHeight * (265/284),iconHeight)
		})*/
	};
	

	/* WFS GeoJSON layer example: */
	var wfsLayer = new L.GeoJSON.WFS("http://opengis.azexperience.org/geoserver/wfs", "vae:azmines", {
		pointToLayer: function(latlng) { return new L.Marker.AttributeFilter(latlng, "commodity", { rules: symbolRules }); },
		popupObj: new JadeContent("templates/example.jade"),
		popupOptions: { maxWidth: 530, centered: true },
		hoverFld: "name"
	}); 
	
	var center = new L.LatLng(34.1618, -111.53332);
	map.setView(center, 7);
	map.addLayer(wfsLayer);
	map.addLayer(worldImagery);

	
	setTimeout(function() { 
		map.addLayer(worldBoundaries);
		setTimeout(function() {
			map.addLayer(worldTransportation);
		}, 250)
	}, 250)
	
	
	}