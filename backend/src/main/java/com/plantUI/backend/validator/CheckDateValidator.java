package com.plantUI.backend.validator;

import java.util.Date;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class CheckDateValidator implements ConstraintValidator<CheckDate, Date> {
    @Override
    public boolean isValid(Date value, ConstraintValidatorContext context) {
        // TODO Auto-generated method stub
        long thisDate = new Date().getTime();
        long thatDate = value.getTime();

        return thatDate <= thisDate;
    }
}
