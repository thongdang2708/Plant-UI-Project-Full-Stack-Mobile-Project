package com.plantUI.backend.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class CheckNumberValidator implements ConstraintValidator<CheckNumber, Double> {

    @Override
    public boolean isValid(Double value, ConstraintValidatorContext context) {

        return value > 0;
    }
}
