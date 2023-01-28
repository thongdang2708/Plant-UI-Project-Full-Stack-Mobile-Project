package com.plantUI.backend.service;

import com.plantUI.backend.entity.Plant;
import java.util.List;

public interface PlantService {
    Plant getPlant(Long id);

    Plant addPlant(Plant plant);

    Plant updatePlant(Long id, Plant plant);

    void deletePlant(Long id);

    List<Plant> getAllPlants();

    List<Plant> getAllPlantsByKeyword(String keyword);

    List<Plant> filterPlantsByType(String type);

    List<Plant> filterPlantsByStatus(String status);

    Plant updateStatus(Long id, String status);

    Plant updateTemporaryQuantity(Long id, Integer temporaryQuantity);

}
