package com.plantUI.backend.exception.methodClass;

public class OrderNotFoundWithIdException extends RuntimeException {
    public OrderNotFoundWithIdException(Long id) {
        super("This order id " + id + " does not exist");
    }
}
