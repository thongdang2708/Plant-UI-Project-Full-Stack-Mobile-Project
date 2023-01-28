package com.plantUI.backend.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import com.plantUI.backend.entity.Expression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.plantUI.backend.entity.Plant;
import com.plantUI.backend.exception.methodClass.PlantNotFoundWithIdException;
import com.plantUI.backend.repository.PlantJPARepository;
import com.plantUI.backend.repository.PlantRepository;
import com.plantUI.backend.entity.Type;

@Service
public class PlantServiceIml implements PlantService {

    @Autowired
    private PlantRepository plantRepository;

    @Autowired
    private PlantJPARepository plantJPARepository;

    @Override
    public Plant getPlant(Long id) {
        Optional<Plant> plant = plantRepository.findById(id);

        if (plant.isPresent()) {
            return plant.get();
        } else {
            throw new PlantNotFoundWithIdException(id);
        }
    }

    @Override
    public Plant addPlant(Plant plant) {

        return plantRepository.save(plant);
    }

    @Override
    public Plant updatePlant(Long id, Plant plant) {
        Plant updatedPlant = getPlant(id);

        updatedPlant.setName(plant.getName());
        updatedPlant.setPrice(plant.getPrice());
        updatedPlant.setUrlImage(plant.getUrlImage());
        updatedPlant.setQuantity(plant.getQuantity());
        updatedPlant.setExpressionStatus(plant.getExpressionStatus());
        updatedPlant.setHighRecommend(plant.getHighRecommend());
        updatedPlant.setPlantType(plant.getPlantType());
        updatedPlant.setDescription(plant.getDescription());

        return plantRepository.save(updatedPlant);
    }

    @Override
    public void deletePlant(Long id) {
        // TODO Auto-generated method stub
        plantRepository.deleteById(id);
    }

    @Override
    public List<Plant> getAllPlants() {
        // TODO Auto-generated method stub
        return (List<Plant>) plantRepository.findAll();
    }

    @Override
    public List<Plant> getAllPlantsByKeyword(String keyword) {
        // TODO Auto-generated method stub
        return plantJPARepository.getAllPlantsBySearch(keyword.toLowerCase());
    }

    @Override
    public List<Plant> filterPlantsByType(String type) {
        List<Plant> plantArrays = (List<Plant>) plantRepository.findAll();

        Type plantType = new Type();

        return plantArrays.stream().filter((x) -> x.getPlantType() == plantType.getPlantType(type))
                .collect(Collectors.toList());
    }

    @Override
    public List<Plant> filterPlantsByStatus(String status) {
        // TODO Auto-generated method stub
        List<Plant> arrayPlants = (List<Plant>) plantRepository.findAll();

        Expression expression = new Expression();

        return arrayPlants.stream().filter(x -> x.getExpressionStatus() == expression.searchStatus(status))
                .collect(Collectors.toList());

    }

    @Override
    public Plant updateStatus(Long id, String status) {
        Plant plant = getPlant(id);
        Expression expression = new Expression();
        plant.setExpressionStatus(expression.searchStatus(status));

        return plantRepository.save(plant);

    }

    @Override
    public Plant updateTemporaryQuantity(Long id, Integer temporaryQuantity) {
        Plant plant = getPlant(id);

        plant.setTemporaryQuantity(temporaryQuantity);

        return plantRepository.save(plant);
    }

}
