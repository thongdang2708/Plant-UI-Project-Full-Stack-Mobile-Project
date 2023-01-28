package com.plantUI.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.plantUI.backend.entity.Order;
import com.plantUI.backend.entity.ProductFromOrder;
import com.plantUI.backend.entity.ProductFromOrderAfterSaveOrder;
import com.plantUI.backend.service.OrderService;
import java.util.List;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/carts")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> addOrder(@Valid @RequestBody Order order) {

        return new ResponseEntity<>(orderService.addOrder(order), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @Valid @RequestBody Order order) {

        return new ResponseEntity<>(orderService.updateOrder(id, order), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return new ResponseEntity<HttpStatus>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/getProducts/{id}")
    public ResponseEntity<List<ProductFromOrderAfterSaveOrder>> getAllProductsInOrder(@PathVariable Long id) {

        return new ResponseEntity<>(orderService.getAllProductsFromOrder(id), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders() {

        return new ResponseEntity<>(orderService.getAllOrders(), HttpStatus.OK);
    }
}
