package com.plantUI.backend.entity;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Type {

    enum PlantType {
        organic,
        indoors,
        synthetic
    }

    PlantType organic = PlantType.organic;
    PlantType indoors = PlantType.indoors;
    PlantType synthetic = PlantType.synthetic;

    public List<PlantType> getAllValues() {
        List<PlantType> array = new ArrayList<>();

        for (PlantType plantType : PlantType.values()) {
            array.add(plantType);
        }

        return array;
    }

    public PlantType getOrganic() {
        return organic;
    }

    public PlantType getIndoors() {
        return indoors;
    }

    public PlantType getSynthetic() {
        return synthetic;
    }

    public PlantType getPlantType(String type) {

        for (PlantType plantType : PlantType.values()) {
            if (plantType.name().contains(type.toLowerCase())) {
                return plantType;
            }
        }

        return null;
    }
}
