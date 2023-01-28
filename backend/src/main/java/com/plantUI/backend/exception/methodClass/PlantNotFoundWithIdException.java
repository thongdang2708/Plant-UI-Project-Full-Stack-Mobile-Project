package com.plantUI.backend.exception.methodClass;

public class PlantNotFoundWithIdException extends RuntimeException {
    public PlantNotFoundWithIdException(Long id) {
        super("This plant with id " + id + " doest not exist!");
    }
}
