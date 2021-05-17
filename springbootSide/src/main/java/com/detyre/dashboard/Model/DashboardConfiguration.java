package com.detyre.dashboard.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "DashboardConfiguration")

public class DashboardConfiguration {
    @Id
    String id;

    @Indexed(unique = true)
    String name;
    String description;


    DashboardWidget widget[];

    public DashboardConfiguration(String name, String description, DashboardWidget[] widget){
        this.name = name;
        this.description = description;
        this.widget = widget;
    }

    public DashboardWidget[] getWidget() {
        return widget;
    }

    public void setWidget(DashboardWidget[] widget) {
        this.widget = widget;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
