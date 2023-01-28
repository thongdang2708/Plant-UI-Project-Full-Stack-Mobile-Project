package com.plantUI.backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.plantUI.backend.entity.ProductFromOrderAfterSaveOrder;
import java.util.List;

@Repository
public interface ProductFromOrderAfterSaveRepository extends CrudRepository<ProductFromOrderAfterSaveOrder, Long> {

    List<ProductFromOrderAfterSaveOrder> findByOrderId(Long id);
}
