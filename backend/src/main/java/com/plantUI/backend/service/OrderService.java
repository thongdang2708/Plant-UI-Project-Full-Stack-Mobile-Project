package com.plantUI.backend.service;

import com.plantUI.backend.entity.Order;
import com.plantUI.backend.entity.ProductFromOrder;
import com.plantUI.backend.entity.ProductFromOrderAfterSaveOrder;

import java.util.List;

public interface OrderService {

    Order addOrder(Order order);

    Order getOrder(Long id);

    Order updateOrder(Long id, Order order);

    void deleteOrder(Long id);

    List<Order> getAllOrders();

    List<ProductFromOrderAfterSaveOrder> getAllProductsFromOrder(Long id);


}
