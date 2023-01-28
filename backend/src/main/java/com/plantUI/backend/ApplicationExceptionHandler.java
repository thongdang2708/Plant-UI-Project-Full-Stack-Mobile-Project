package com.plantUI.backend;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.plantUI.backend.exception.entity.ErrorResponse;
import com.plantUI.backend.exception.methodClass.OrderNotFoundWithIdException;
import com.plantUI.backend.exception.methodClass.PlantNotFoundWithIdException;
import com.plantUI.backend.exception.methodClass.PlantQuantityOverException;
import com.plantUI.backend.exception.methodClass.UploadFileFailException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@ControllerAdvice
public class ApplicationExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    @Nullable
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
            HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        List<String> errors = new ArrayList<>();

        for (ObjectError error : ex.getBindingResult().getAllErrors()) {
            errors.add(error.getDefaultMessage());
        }

        return new ResponseEntity<>(new ErrorResponse(errors), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({ PlantNotFoundWithIdException.class, OrderNotFoundWithIdException.class })
    public ResponseEntity<Object> handleNotFoundException(RuntimeException ex) {

        ErrorResponse errors = new ErrorResponse(Arrays.asList(ex.getLocalizedMessage()));

        return new ResponseEntity<>(errors, HttpStatus.NOT_FOUND);

    }

    @ExceptionHandler({ UploadFileFailException.class, PlantQuantityOverException.class })
    public ResponseEntity<Object> handleBadRequest(RuntimeException ex) {
        ErrorResponse errors = new ErrorResponse(Arrays.asList(ex.getLocalizedMessage()));

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

}
