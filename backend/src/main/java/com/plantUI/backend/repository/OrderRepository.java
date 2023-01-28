package com.plantUI.backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.plantUI.backend.entity.Order;

@Repository
public interface OrderRepository extends CrudRepository<Order, Long> {

}
