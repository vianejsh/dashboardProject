package com.detyre.dashboard.Repository;

import com.detyre.dashboard.Model.DashboardConfiguration;
import com.detyre.dashboard.Model.DashboardWidget;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DashboardRepository extends MongoRepository<DashboardConfiguration, String> {



}
