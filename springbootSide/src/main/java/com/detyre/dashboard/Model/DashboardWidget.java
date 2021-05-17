package com.detyre.dashboard.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.mongodb.lang.NonNull;

//@Document (collection = "DashboardWidgets")
public class DashboardWidget {
	
	//@NonNull
	//String dashboardName;
//	@Id
    String name;
    String chartType;
    int xCoord;
    int yCoord;

    public int getxCoord() {
		return xCoord;
	}

	public void setxCoord(int xCoord) {
		this.xCoord = xCoord;
	}

	public int getyCoord() {
		return yCoord;
	}

	public void setyCoord(int yCoord) {
		this.yCoord = yCoord;
	}

	public DashboardWidget(String name, String chartType) {
        this.name = name;
        this.chartType = chartType;
        this.xCoord = 0;
        this.yCoord = 0;
    }
	
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getChartType() {
        return chartType;
    }

    public void setChartType(String chartType) {
        this.chartType = chartType;
    }
}
