/* 
 * Copyright (C) 2012 B3Partners B.V.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

Ext.define("viewer.SLD", {
    config: {
        actionbeanUrl: null
    },
    constructor: function(config) {        
        this.initConfig(config);  
        if(this.config.actionbeanUrl == null) {
            this.config.actionbeanUrl = actionBeans["sld"];
        }
    },
    /**
     * Create a SLD for named layer in the layer parameter. Optionally specify
     * the named style and filter. The style and cqlFilter parameters can be
     * null. Specify the feature type name when specifying a CQL filter or leave
     * it null for the same name as the layer.
     * 
     * Use sldId to apply filter to existing StyleLibrary saved in database (may
     * be external, retrieved server-side).
     * 
     * Examples:
     * var f = function(sld) { alert(sld); };
     * create("mylayer", null, null, null, null, f, f);
     * create("mylayer", null, "property = 'value'", "thelayerfeaturetype", null, f, f);
     * create("mylayer", "default", null, null, null, f, f);
     */
    create: function(layer, style, cqlFilter, featureTypeName, sldId, successFunction, failureFunction) {
        
        Ext.Ajax.request({
            url: this.config.actionbeanUrl,
            params: {layer: layer, style: style, filter: cqlFilter, featureTypeName: featureTypeName, id: sldId, format: 'json'}, 
            success: function(result) {
                var response = Ext.JSON.decode(result.responseText);
                
                if(response.success) {
                    successFunction(response.sld);
                } else {
                    if(failureFunction != undefined) {
                        failureFunction(response.error);
                    }
                }
            },
            failure: function(result) {
                if(failureFunction != undefined) {
                    failureFunction("Ajax request failed with status " + result.status + " " + result.statusText + ": " + result.responseText);
                }
            }
        });
    },
    
    createURL: function(layer, style, cqlFilter, featureTypeName, sldId) {
        var url = absoluteURIPrefix + this.config.actionbeanUrl;
        url = Ext.urlAppend(url, "layer=" + layer);
        url = Ext.urlAppend(url, "style=" + style);
        url = Ext.urlAppend(url, "filter=" + cqlFilter);
        url = Ext.urlAppend(url, "featureTypeName=" + featureTypeName);
        url = Ext.urlAppend(url, "id=" + sldId);
        url = Ext.urlAppend(url, "format=xml");
        return url;
    }
});
