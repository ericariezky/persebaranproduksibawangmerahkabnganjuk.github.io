// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/html jimu/utils dojo/dom-construct dijit/_TemplatedMixin dijit/_WidgetBase".split(" "),function(n,h,l,f,m,c,p,q){return n([q,p],{name:"FilterEditor",baseClass:"jimu-widget-FilterEditor",declaredClass:"jimu.dijit.FilterEditor",templateString:"\x3cdiv style\x3d'width:100%'\x3e\x3cdiv data-dojo-attach-point\x3d'filterEditorDiv'\x3e\x3c/div\x3e\x3c/div\x3e",_settings:null,_editWidget:null,_origGetItemsFromLayerFunc:null,postCreate:function(){this.nls=
this._editWidget.nls;this._createFilterTool()},_createFilterTool:function(){var a=c.create("label",{innerHTML:this.nls.featureLayers});c.place(a,this.filterEditorDiv);this._createLayerFilter();this._createTemplateFilter()},_createLayerFilter:function(){this.selectDropDown=c.create("select",{"class":"jimu-input flDropDown"});c.place(this.selectDropDown,this.filterEditorDiv);this.selectDropDown.onchange=h.hitch(this,function(){this._onLayerFilterChanged()});var a=c.create("option",{value:"all",innerHTML:window.jimuNls.common.all});
c.place(a,this.selectDropDown);for(a=0;a<this._editWidget._layerObjectsParaForTempaltePicker.length;a++){var b=this._editWidget._layerObjectsParaForTempaltePicker[a];b=c.create("option",{value:b.id,innerHTML:m.sanitizeHTML(b.name)});c.place(b,this.selectDropDown)}},_createTemplateFilter:function(){this.filterTextBox=c.create("input",{"class":"jimu-input searchtextbox",type:"text",placeholder:this.nls.searchTemplates},this.filterEditorDiv);this.filterTextBox.onkeyup=h.hitch(this,function(){this._onTempalteFilterChanged()});
var a=this._editWidget.editor.templatePicker;this._origGetItemsFromLayerFunc=a._getItemsFromLayer;a._getItemsFromLayer=h.hitch(this,function(){var b=this._origGetItemsFromLayerFunc.apply(a,arguments);var d=this.filterTextBox.value;d&&(b=l.filter(b,function(e){var k=!1,g=new RegExp(d,"ig");e.hasOwnProperty("label")&&e.label.match(g)&&0<e.label.match(g).length&&(k=!0);e.hasOwnProperty("template")&&e.template.hasOwnProperty("name")&&e.template.name.match(g)&&0<e.template.name.match(g).length&&(k=!0);
return k}));0===b.length&&(this._editWidget.editor.templatePicker.grid.noDataMessage=this.nls.noAvailableTempaltes);return b})},show:function(){f.setStyle(this.domNode,"display","block")},hide:function(){f.setStyle(this.domNode,"display","none")},selectLayerFilterByValue:function(a){l.forEach(this.selectDropDown.options,function(b,d){b.value===a&&(this.selectDropDown.selectedIndex=d)},this)},setTemplateFilter:function(a){this.filterTextBox.value=a},disableLayerFilter:function(){f.setAttr(this.selectDropDown,
"disabled",!0)},enableLayerFilter:function(){f.setAttr(this.selectDropDown,"disabled",!1)},update:function(){var a;for(a=this.selectDropDown.options.length-1;0<=a;a--)"all"!==this.selectDropDown.options[a].value&&this.selectDropDown.remove(a);for(a=0;a<this._editWidget._layerObjectsParaForTempaltePicker.length;a++){var b=this._editWidget._layerObjectsParaForTempaltePicker[a];b=c.create("option",{value:b.id,innerHTML:m.sanitizeHTML(b.name)});c.place(b,this.selectDropDown)}this._editWidget.editor.templatePicker.attr("grouping",
!0);this.setTemplateFilter("")},_onLayerFilterChanged:function(a){var b=this._editWidget.editor.templatePicker;b.clearSelection();var d=this.selectDropDown.options[this.selectDropDown.selectedIndex].text;""!==d&&("All"===d?(b.attr("featureLayers",this._editWidget._layerObjectsParaForTempaltePicker),""===this.filterTextBox.value?b.attr("grouping",!0):b.attr("grouping",!1)):(d=this._editWidget.map.getLayer(this.selectDropDown.value),b.attr("featureLayers",[d]),b.attr("grouping",!1)),a&&b.attr("grouping",
!0),b.update(!0))},_onTempalteFilterChanged:function(a){var b=this.selectDropDown.options[this.selectDropDown.selectedIndex].text,d=this.filterTextBox.value;this._editWidget.editor.templatePicker.clearSelection();"All"===b&&""===d?this._editWidget.editor.templatePicker.attr("grouping",!0):this._editWidget.editor.templatePicker.attr("grouping",!1);a&&this._editWidget.editor.templatePicker.attr("grouping",!0);this._editWidget.editor.templatePicker.update(!0)}})});