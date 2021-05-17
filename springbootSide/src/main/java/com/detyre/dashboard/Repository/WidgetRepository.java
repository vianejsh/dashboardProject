package com.detyre.dashboard.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.detyre.dashboard.Model.DashboardWidget;

public interface WidgetRepository extends MongoRepository<DashboardWidget, String> {

//	List<DashboardWidget> findAllBydashboardName(String dashboard_name);
}
