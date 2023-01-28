package com.plantUI.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.plantUI.backend.entity.Plant;
import com.plantUI.backend.exception.entity.ErrorResponse;
import com.plantUI.backend.service.PlantService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import jakarta.validation.Valid;
import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/plant")
public class PlantController {

    @Autowired
    private PlantService plantService;

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({ HttpMessageNotReadableException.class })
    public ResponseEntity<Object> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex) {

        ErrorResponse errors = new ErrorResponse(Arrays.asList(ex.getLocalizedMessage()));

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);

    }

    @GetMapping("/{id}")
    public ResponseEntity<Plant> getSinglePlant(@PathVariable Long id) {

        return new ResponseEntity<>(plantService.getPlant(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Plant> createPlant(@Valid @RequestBody Plant plant) {

        return new ResponseEntity<>(plantService.addPlant(plant), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Plant> updatePlant(@PathVariable Long id, @Valid @RequestBody Plant plant) {

        return new ResponseEntity<>(plantService.updatePlant(id, plant), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Plant> deletePlant(@PathVariable Long id) {
        plantService.deletePlant(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Plant>> getAllPlants() {
        return new ResponseEntity<>(plantService.getAllPlants(), HttpStatus.OK);
    }

    @GetMapping("/search/{keyword}")
    public ResponseEntity<List<Plant>> searchPlants(@PathVariable String keyword) {

        return new ResponseEntity<>(plantService.getAllPlantsByKeyword(keyword), HttpStatus.OK);
    }

    @GetMapping("/filter/type/{type}")
    public ResponseEntity<List<Plant>> getPlantsByType(@PathVariable String type) {
        return new ResponseEntity<>(plantService.filterPlantsByType(type), HttpStatus.OK);
    }

    @GetMapping("/filter/status/{status}")
    public ResponseEntity<List<Plant>> getPlantsByStatus(@PathVariable String status) {

        return new ResponseEntity<>(plantService.filterPlantsByStatus(status), HttpStatus.OK);
    }

    @PutMapping("/{id}/update/{status}")
    public ResponseEntity<Plant> updateStatus(@PathVariable Long id, @PathVariable String status) {

        return new ResponseEntity<>(plantService.updateStatus(id, status), HttpStatus.OK);
    }

    @PutMapping("/{id}/changeTempQuantity/{temporaryQuantity}")
    public ResponseEntity<Plant> updateTemporaryQuantity(@PathVariable Long id,
            @PathVariable Integer temporaryQuantity) {

        return new ResponseEntity<>(plantService.updateTemporaryQuantity(id, temporaryQuantity), HttpStatus.OK);
    }

}
