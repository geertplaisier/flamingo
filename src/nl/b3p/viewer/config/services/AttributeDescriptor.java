/*
 * Copyright (C) 2011 B3Partners B.V.
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
package nl.b3p.viewer.config.services;

import javax.persistence.*;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author Matthijs Laan
 */
@Entity
public class AttributeDescriptor {
    public static final String TYPE_STRING = "string";
    public static final String TYPE_DOUBLE = "double";
    public static final String TYPE_INTEGER = "integer";
    public static final String TYPE_BOOLEAN = "boolean";
    public static final String TYPE_GEOMETRY = "geometry";    
    public static final String TYPE_DATE = "date";
    public static final String TYPE_TIMESTAMP = "timestamp";
    public static final String TYPE_GEOMETRY_POINT = "point";
    public static final String TYPE_GEOMETRY_MPOINT = "multipoint";
    public static final String TYPE_GEOMETRY_LINESTRING = "linestring";
    public static final String TYPE_GEOMETRY_MLINESTRING = "multilinestring";
    public static final String TYPE_GEOMETRY_POLYGON = "polygon";
    public static final String TYPE_GEOMETRY_MPOLYGON = "multipolygon";

    @Id
    private Long id;

    @Basic(optional=false)
    private String name;

    @Column(name="name_alias")
    private String alias;

    private String type;

    //<editor-fold defaultstate="collapsed" desc="getters en setters">
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    //</editor-fold>
    
    public JSONObject toJSONObject() throws JSONException {
        JSONObject j = new JSONObject();
        j.put("id", id);
        j.put("name", name);
        j.put("alias", alias);
        j.put("type", type);
        return j;
    }
}
