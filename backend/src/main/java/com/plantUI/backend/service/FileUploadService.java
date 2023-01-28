package com.plantUI.backend.service;

import java.util.stream.Stream;

import org.springframework.web.multipart.MultipartFile;

import java.nio.file.*;

public interface FileUploadService {

    String uploadFile(MultipartFile file, Long plantId);

    Stream<Path> getAllFiles();

    byte[] readFileContent(String fileName);
}
