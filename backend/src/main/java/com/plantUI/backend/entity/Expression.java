package com.plantUI.backend.entity;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Expression {
    enum ExpressionStatus {
        liked,
        unliked
    }

    ExpressionStatus liked = ExpressionStatus.liked;
    ExpressionStatus unliked = ExpressionStatus.unliked;

    public List<ExpressionStatus> getAllStatuses() {

        List<ExpressionStatus> arrays = new ArrayList<>();

        for (ExpressionStatus expressionStatus : ExpressionStatus.values()) {
            arrays.add(expressionStatus);
        }

        return arrays;
    }

    public ExpressionStatus getLiked() {
        return liked;
    }

    public ExpressionStatus getUnliked() {
        return unliked;
    }

    public ExpressionStatus searchStatus(String status) {

        for (ExpressionStatus expressionStatus : ExpressionStatus.values()) {
            if (expressionStatus.name().contains(status.toLowerCase())) {
                return expressionStatus;
            }
        }
        return null;
    }
}
