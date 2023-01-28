package com.plantUI.backend.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.util.List;
import java.util.stream.Collectors;

import com.plantUI.backend.service.FileUploadService;
import com.plantUI.backend.storageObject.Response;

@RestController
@RequestMapping("/api/v1")
public class FileUploadController {

    @Autowired
    private FileUploadService fileUploadService;

    @PostMapping("/file/upload/plant/{plantId}")
    public ResponseEntity<Response> uploadFile(@RequestParam("file") MultipartFile file, @PathVariable Long plantId) {

        String generatedFileName = fileUploadService.uploadFile(file, plantId);

        return new ResponseEntity<>(new Response("OK", "Upload file successfully!", generatedFileName),
                HttpStatus.CREATED);

    }

    @GetMapping("/file/read/{fileName:.+}")
    public ResponseEntity<byte[]> readFileContent(@PathVariable String fileName) {

        try {

            byte[] bytes = fileUploadService.readFileContent(fileName);

            System.out.println(bytes);
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(bytes);

        } catch (RuntimeException exception) {
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping("/file/read/all")
    public ResponseEntity<Response> getAllFiles() {

        try {

            List<String> arrayFiles = fileUploadService.getAllFiles()
                    .map((path) -> {
                        String urlPath = MvcUriComponentsBuilder.fromMethodName(FileUploadController.class,
                                "readFileContent", path.getFileName().toString()).build().toUri().toString();

                        return urlPath;
                    })
                    .collect(Collectors.toList());

            return new ResponseEntity<>(new Response("OK", "Get all files successfully!", arrayFiles), HttpStatus.OK);

        } catch (RuntimeException exception) {
            return new ResponseEntity<>(new Response("Failed", "Failed to upload file", new String[] {}),
                    HttpStatus.BAD_REQUEST);
        }
    }

}
