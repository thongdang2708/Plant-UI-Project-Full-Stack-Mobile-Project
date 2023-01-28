package com.plantUI.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.plantUI.backend.entity.Plant;

@Repository
public interface PlantJPARepository extends JpaRepository<Plant, Long> {

    @Modifying
    @Query("Select p from Plant p where " +
            "concat(p.id, lower(p.name), lower(p.description), p.price, p.quantity)" +
            " like %:keyword%")
    List<Plant> getAllPlantsBySearch(@Param("keyword") String keyword);

}
