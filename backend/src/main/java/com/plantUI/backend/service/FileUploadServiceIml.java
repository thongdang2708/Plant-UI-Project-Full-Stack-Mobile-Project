package com.plantUI.backend.service;

import java.nio.file.Path;
import java.util.Arrays;
import java.util.UUID;
import java.util.stream.Stream;

import org.apache.commons.io.FilenameUtils;
import org.apache.xmlbeans.impl.common.IOUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.util.StreamUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.TransferManagerBuilder;
import com.amazonaws.services.s3.transfer.Upload;
import com.amazonaws.util.IOUtils;
import com.plantUI.backend.entity.Plant;
import com.plantUI.backend.exception.methodClass.UploadFileFailException;
import com.plantUI.backend.repository.PlantRepository;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;

@Service
public class FileUploadServiceIml implements FileUploadService {

    private final Path storageFolder = Paths.get("uploads");

    private final String bucketName = "elasticbeanstalk-us-east-1-235158775596";

    @Autowired
    private AmazonS3 s3client;

    public boolean isImageFile(MultipartFile file) {

        String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());

        return Arrays.asList(new String[] { "png", "jpg", "jpeg", "bmp" }).contains(fileExtension.trim().toLowerCase());
    }

    @Autowired
    private PlantService plantService;

    @Autowired
    private PlantRepository plantRepository;

    @Override
    public String uploadFile(MultipartFile file, Long plantId) {

        Plant plant = plantService.getPlant(plantId);

        try {

            if (file.isEmpty()) {
                throw new UploadFileFailException("File is empty, cannot upload file");
            }

            if (!isImageFile(file)) {
                throw new UploadFileFailException("File is not image file, cannot upload file");
            }

            float fileSizeInMegabytes = file.getSize() / 1_000_000.0f;

            if (fileSizeInMegabytes > 5.0f) {
                throw new UploadFileFailException("File must be <= 5 Mb");
            }

            String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
            String generatedFileName = UUID.randomUUID().toString().replace("-", "");
            generatedFileName = generatedFileName + "." + fileExtension;

            Path destinationFilePath = this.storageFolder.resolve(
                    Paths.get(generatedFileName)).normalize().toAbsolutePath();

            if (!destinationFilePath.getParent().equals(this.storageFolder.toAbsolutePath())) {
                throw new UploadFileFailException("Cannot upload file outside current directory!");
            }

            // try (InputStream inputStream = file.getInputStream()) {
            // Files.copy(file.getInputStream(), destinationFilePath,
            // StandardCopyOption.REPLACE_EXISTING);

            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentType(file.getContentType());
            objectMetadata.setContentLength(file.getSize());
            s3client.putObject(
                    new PutObjectRequest(bucketName, generatedFileName, file.getInputStream(), objectMetadata));

            // }
            setTextForUrlImageForPlant(plant, generatedFileName);

            return generatedFileName;

        } catch (IOException exception) {
            throw new UploadFileFailException("Cannot upload file!");
        }

    }

    public void setTextForUrlImageForPlant(Plant plant, String generatedFileName) {

        plant.setUrlImage(generatedFileName);

        plantRepository.save(plant);

    }

    @Override
    public Stream<Path> getAllFiles() {
        try {

            return Files.walk(this.storageFolder, 1)
                    .filter((path) -> !path.equals(this.storageFolder) && !path.toString().contains("._"))
                    .map(this.storageFolder::relativize);

        } catch (IOException exception) {
            throw new UploadFileFailException("Cannot get a list of all files!");
        }
    }

    public InputStream getImage(String nameOfBucket, String imageName) {

        S3Object s3Object = s3client.getObject(nameOfBucket, imageName);

        return s3Object.getObjectContent();
    }

    @Override
    public byte[] readFileContent(String fileName) {

        try {

            InputStream in = getImage(bucketName, fileName);
            return IOUtils.toByteArray(in);
            // Path path = this.storageFolder.resolve(fileName);
            // UrlResource resource = new UrlResource(path.toUri());

            // if (resource.exists() || resource.isReadable()) {
            // byte[] bytes = StreamUtils.copyToByteArray(resource.getInputStream());

            // return bytes;
            // } else {
            // throw new UploadFileFailException("Cannot read this file!");
            // }

        } catch (IOException exception) {
            throw new UploadFileFailException("Cannot read this file!");
        }
    }
}
