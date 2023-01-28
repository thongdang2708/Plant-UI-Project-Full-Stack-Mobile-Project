package com.plantUI.backend.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.apache.commons.math3.stat.descriptive.summary.Product;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.plantUI.backend.validator.CheckDate;

import jakarta.annotation.Generated;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @CheckDate(message = "Date must be today or in the previous dates!")
    @Column(name = "order_date")
    private Date orderDate;

    @Transient
    private Set<ProductFromOrder> productsFromOrder = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<ProductFromOrderAfterSaveOrder> productsFromOrderAfterSaveOrders = new ArrayList<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "order_plant", joinColumns = @JoinColumn(name = "order_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "plant_id"))
    private Set<Plant> plants = new HashSet<>();

    public Order(Long id, Date orderDate) {
        this.id = id;
        this.orderDate = orderDate;
    }

    public Order() {
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getOrderDate() {
        return this.orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public Set<ProductFromOrder> getProductsFromOrder() {
        return this.productsFromOrder;
    }

    public void setProductsFromOrder(Set<ProductFromOrder> productsFromOrder) {
        this.productsFromOrder = productsFromOrder;
    }

    public List<ProductFromOrderAfterSaveOrder> getProductsFromOrderAfterSaveOrders() {
        return this.productsFromOrderAfterSaveOrders;
    }

    public void setProductsFromOrderAfterSaveOrders(
            List<ProductFromOrderAfterSaveOrder> productsFromOrderAfterSaveOrders) {
        this.productsFromOrderAfterSaveOrders = productsFromOrderAfterSaveOrders;
    }

    public Set<Plant> getPlants() {
        return this.plants;
    }

    public void setPlants(Set<Plant> plants) {
        this.plants = plants;
    }

    public void addPlantToOrder(Plant plant) {
        this.plants.add(plant);
    }
}
