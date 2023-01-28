package com.plantUI.backend.entity;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.plantUI.backend.entity.Expression.ExpressionStatus;
import com.plantUI.backend.entity.Type.PlantType;
import com.plantUI.backend.validator.CheckNumber;
import com.plantUI.backend.validator.CheckQuantity;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "plant")
public class Plant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Size(min = 2, message = "Name of plant must be at least 2 characters!")
    @NotBlank(message = "Name must be filled!")
    @Column(name = "name", nullable = false)
    private String name;

    @CheckNumber(message = "Price must be larger than 0")
    @Column(name = "price", nullable = false)
    @NonNull
    private Double price;

    @Column(name = "url_image")
    private String urlImage;

    @CheckQuantity(message = "Quantity must be >=0, not be a minus value")
    @Column(name = "quantity", nullable = false)
    @NonNull
    private Integer quantity;

    @Enumerated(EnumType.STRING)
    @Column(name = "expression_status", nullable = false)
    @NonNull
    private ExpressionStatus expressionStatus;

    @Column(name = "high_recommend", nullable = false)
    @NonNull
    private Boolean highRecommend;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    @NonNull
    private PlantType plantType;

    @Column(name = "temporary_quantity", nullable = false)
    @NonNull
    private Integer temporaryQuantity;

    @NotBlank(message = "Description must not be blank!")
    @Size(min = 5, message = "Description must be at least 5 characters!")
    @Column(name = "description", nullable = false)
    private String description;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "order_plant", joinColumns = @JoinColumn(name = "plant_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "order_id"))
    private Set<Order> orders = new HashSet<>();

    public Plant(Long id, String name, Double price, Integer quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    public Plant(Long id, String name, Double price, String urlImage, Integer quantity,
            ExpressionStatus expressionStatus, Boolean highRecommend, PlantType plantType, String description) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.urlImage = urlImage;
        this.quantity = quantity;
        this.expressionStatus = expressionStatus;
        this.highRecommend = highRecommend;
        this.plantType = plantType;
        this.description = description;
    }

    public Plant() {
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return this.price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getUrlImage() {
        return this.urlImage;
    }

    public void setUrlImage(String urlImage) {
        this.urlImage = urlImage;
    }

    public Integer getQuantity() {
        return this.quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public ExpressionStatus getExpressionStatus() {
        return this.expressionStatus;
    }

    public void setExpressionStatus(ExpressionStatus expressionStatus) {
        this.expressionStatus = expressionStatus;
    }

    public Boolean isHighRecommend() {
        return this.highRecommend;
    }

    public Boolean getHighRecommend() {
        return this.highRecommend;
    }

    public void setHighRecommend(Boolean highRecommend) {
        this.highRecommend = highRecommend;
    }

    public PlantType getPlantType() {
        return this.plantType;
    }

    public void setPlantType(PlantType plantType) {
        this.plantType = plantType;
    }

    public Integer getTemporaryQuantity() {
        return this.temporaryQuantity;
    }

    public void setTemporaryQuantity(Integer temporaryQuantity) {
        this.temporaryQuantity = temporaryQuantity;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Order> getOrders() {
        return this.orders;
    }

    public void setOrders(Set<Order> orders) {
        this.orders = orders;
    }

}
