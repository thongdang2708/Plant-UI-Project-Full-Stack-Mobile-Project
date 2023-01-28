package com.plantUI.backend.service;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.plantUI.backend.entity.Order;
import com.plantUI.backend.entity.Plant;
import com.plantUI.backend.entity.ProductFromOrder;
import com.plantUI.backend.entity.ProductFromOrderAfterSaveOrder;
import com.plantUI.backend.exception.methodClass.OrderNotFoundWithIdException;
import com.plantUI.backend.exception.methodClass.PlantQuantityOverException;
import com.plantUI.backend.repository.OrderRepository;
import com.plantUI.backend.repository.PlantRepository;
import com.plantUI.backend.repository.ProductFromOrderAfterSaveRepository;

import java.util.List;

@Service
public class OrderServiceIml implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private PlantService plantService;

    @Autowired
    private PlantRepository plantRepository;

    @Autowired
    private ProductFromOrderAfterSaveRepository productFromOrderAfterSaveRepository;

    @Override
    public Order getOrder(Long id) {
        Optional<Order> order = orderRepository.findById(id);

        if (order.isPresent()) {
            return order.get();
        } else {
            throw new OrderNotFoundWithIdException(id);
        }
    }

    @Override
    public Order addOrder(Order order) {

        Set<ProductFromOrder> productsFromOrder = order.getProductsFromOrder();

        for (ProductFromOrder productFromOrder : productsFromOrder) {
            Plant plant = plantService.getPlant(productFromOrder.getId());

            if (plant.getQuantity() == 0) {
                throw new PlantQuantityOverException("Cannot minus due to out of stock!");
            } else if (plant.getQuantity() < productFromOrder.getQuantity()) {
                throw new PlantQuantityOverException("Do not have enough stocks to minus");
            } else {
                plant.setQuantity(plant.getQuantity() - productFromOrder.getQuantity());
                plant.setTemporaryQuantity(plant.getQuantity());
                plantRepository.save(plant);
            }
        }

        Order createdOrder = orderRepository.save(order);

        for (ProductFromOrder productFromOrder : productsFromOrder) {
            Plant plant = plantService.getPlant(productFromOrder.getId());

            createdOrder.addPlantToOrder(plant);
            orderRepository.save(createdOrder);
        }

        for (ProductFromOrder productFromOrder : productsFromOrder) {
            ProductFromOrderAfterSaveOrder newProductFromOrderAfterSaveOrder = new ProductFromOrderAfterSaveOrder(
                    productFromOrder.getName(), productFromOrder.getPrice(), productFromOrder.getQuantity(),
                    productFromOrder.getId());
            ProductFromOrderAfterSaveOrder newProductFromOrderAfterSaveOrder2 = productFromOrderAfterSaveRepository
                    .save(newProductFromOrderAfterSaveOrder);
            newProductFromOrderAfterSaveOrder2.setOrder(createdOrder);
            productFromOrderAfterSaveRepository.save(newProductFromOrderAfterSaveOrder2);

        }

        return createdOrder;

    }

    @Override
    public Order updateOrder(Long id, Order order) {
        Order updatedOrder = getOrder(id);

        updatedOrder.setOrderDate(order.getOrderDate());

        return orderRepository.save(updatedOrder);
    }

    @Override
    public void deleteOrder(Long id) {

        List<ProductFromOrderAfterSaveOrder> arrayOfProductsInOrder = getAllProductsFromOrder(id);

        for (ProductFromOrderAfterSaveOrder product : arrayOfProductsInOrder) {
            Plant plant = plantService.getPlant(product.getProductId());

            plant.setQuantity(plant.getQuantity() + product.getQuantity());
            plant.setTemporaryQuantity(plant.getQuantity());
            plantRepository.save(plant);
        }

        orderRepository.deleteById(id);
    }

    @Override
    public List<Order> getAllOrders() {
        return (List<Order>) orderRepository.findAll();
    }

    @Override
    public List<ProductFromOrderAfterSaveOrder> getAllProductsFromOrder(Long id) {
        return productFromOrderAfterSaveRepository.findByOrderId(id);
    }
}
