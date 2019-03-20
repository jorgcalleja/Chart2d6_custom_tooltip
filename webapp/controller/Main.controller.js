sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/viz/ui5/format/ChartFormatter",
	"sap/viz/ui5/api/env/Format",
	"sap/m/MessageToast"
], function (Controller, JSONModel, ChartFormatter, Format, MessageToast) {
	"use strict";

	return Controller.extend("jorgcalleja.dice.statistics.Dice_Statistics_sample.controller.Main", {
		onInit : function() {

// if SAPUI5 < 1.32.11 ...
//SVGElement.prototype.getTransformToElement = SVGElement.prototype.getTransformToElement || function(elem) { return elem.getScreenCTM().inverse().multiply(this.getScreenCTM()); }; 		

			var oData = { "Dice" : [
				{ "value" : "2", "prob"  : "2.7", "probAc" : "100" },
				{ "value" : "3", "prob"  : "5.5", "probAc" : "97.2" },
				{ "value" : "4", "prob"  : "8.3", "probAc" : "91.7" },
				{ "value" : "5", "prob"  : "11.1", "probAc" : "83.3" },
				{ "value" : "6", "prob"  : "13.9", "probAc" : "72.2" },
				{ "value" : "7", "prob"  : "16.7", "probAc" : "58.3" },
				{ "value" : "8", "prob"  : "13.9", "probAc" : "41.7" },
				{ "value" : "9", "prob"  : "11.1", "probAc" : "27.8" },
				{ "value" : "10", "prob"  : "8.3", "probAc" : "16.7" },
				{ "value" : "11", "prob"  : "5.5", "probAc" : "8.3" },
				{ "value" : "12", "prob"  : "2.7", "probAc" : "2.7" }
			] };
			this.getView().setModel(new JSONModel(oData));

			this.oVizFrame = this.byId("idVizFrame");
			this.oVizFrame.setVizProperties( { "title" : { "text" : "2d6"} });

			// Configuración del PopOver
			var oPopOver = this.byId("idPopOver");
            oPopOver.connect(this.oVizFrame.getVizUid());
            
            // Creamos el contenido personalizado del PopOver
    		this.oLayout = new sap.ui.layout.VerticalLayout().addStyleClass("sapUiTinyMargin");
    		this.oSeleccion = new sap.m.Text();
    		this.oTotal = new sap.m.Text();
    		// Añadimos los textos al 
    		this.oLayout.addContent( this.oSeleccion ).addContent( this.oTotal );	

			// Recalculamos el contenido del PopOver
            oPopOver.setCustomDataControl( function(data) { 
            		var aDatos = this.oVizFrame.vizSelection();		// Recuperamos los puntos seleccionados
            		
        			// Generamos el contenido que van a tener los textos
            		var sSeleccion = "";
            		var nTotal = 0;
            		for (var i in aDatos) {
            			sSeleccion += aDatos[i].data.Resultado + "; ";
            			nTotal += aDatos[i].data.Probabilidad;
            		}
            		
            		// Asignamos los valores a los textos
            		this.oSeleccion.setText("Selección: " + sSeleccion);
            		this.oTotal.setText("Total: " + nTotal);
            		return this.oLayout;		// Hay que devolver el objeto
            	}.bind(this)	// Estamos "pasando el this" de la vista al interior de la función...
            );
			
			// Creamos botones para ejecutar acciones adicionales
            oPopOver.setActionItems([{
                type: 'action',
                text: 'Ayuda',
                press: function() {
                            MessageToast.show("Se muestran los valores seleccionados " + 
                            	"y la probabilidad de obtener uno de ese conjunto.");
                        }
            }]);
		}
	});
});
