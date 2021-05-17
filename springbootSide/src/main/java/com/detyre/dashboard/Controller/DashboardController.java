package com.detyre.dashboard.Controller;

import com.detyre.dashboard.Model.DashboardConfiguration;
import com.detyre.dashboard.Model.DashboardWidget;
import com.detyre.dashboard.Repository.DashboardRepository;
import com.detyre.dashboard.Repository.WidgetRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class DashboardController {

    @Autowired
    DashboardRepository dashboardRepository;
    
    

    public DashboardController (DashboardRepository repository) {
        this.dashboardRepository = repository;
        //this.widgetRepository = widgetRepository;
    }

    /*
    @GetMapping ("/widgets/{dashboard_name}")
    public List<DashboardWidget> getAllWidgetForConfig(@PathVariable("dashboard_name") String dashboard_name){
    	
    	List<DashboardWidget> widgets = widgetRepository.findAllBydashboardName(dashboard_name);
    	
    	return widgets;
    }*/
    
   
    
    @GetMapping("/dashboards")
    public List<DashboardConfiguration> getAllConfigurations() {

        List<DashboardConfiguration> configurations = dashboardRepository.findAll();
        configurations.forEach(System.out::println);
        return configurations;

    }

    @GetMapping("/dashboards/{id}")
    public ResponseEntity<DashboardConfiguration> getConfigurationById(@PathVariable("id") String id) {
        Optional<DashboardConfiguration> configurationData = dashboardRepository.findById(id);
        if (configurationData.isPresent()) {
            return new ResponseEntity<>(configurationData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/dashboards")
    public ResponseEntity<DashboardConfiguration> createConfiguration(@RequestBody DashboardConfiguration configuration) {
        try {
            DashboardConfiguration _configuration = dashboardRepository.save(new DashboardConfiguration(configuration.getName(), configuration.getDescription(),configuration.getWidget()));
            return new ResponseEntity<>(_configuration, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/dashboards/{id}")
    public ResponseEntity<DashboardConfiguration> updateConfiguration(@PathVariable("id") String id, @RequestBody DashboardConfiguration configuration) {
        Optional<DashboardConfiguration> configurationData = dashboardRepository.findById(id);

        if (configurationData.isPresent()) {
            DashboardConfiguration _configuration = configurationData.get();
            _configuration.setName(configuration.getName());
            _configuration.setDescription(configuration.getDescription());
            _configuration.setWidget(configuration.getWidget());
            return new ResponseEntity<>(dashboardRepository.save(_configuration), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/dashboards/{id}")
    public ResponseEntity<HttpStatus> deleteConfiguration(@PathVariable("id") String id) {
        try {
            dashboardRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/dashboards")
    public ResponseEntity<HttpStatus> deleteAllConfigurations() {
        try {
            dashboardRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}