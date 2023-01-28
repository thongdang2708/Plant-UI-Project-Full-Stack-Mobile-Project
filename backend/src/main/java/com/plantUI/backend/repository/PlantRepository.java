package com.plantUI.backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.plantUI.backend.entity.Plant;

@Repository
public interface PlantRepository extends CrudRepository<Plant, Long> {

}
