package com.ssafy.gogosing.global.s3upload;

import com.amazonaws.AmazonClientException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.util.IOUtils;
import com.ssafy.gogosing.domain.user.User;
import com.ssafy.gogosing.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ImageService {

    @Value("${cloud.aws.s3.bucket}")
    private String S3Bucket;

    @Autowired
    AmazonS3Client amazonS3Client;

    private final UserRepository userRepository;

    @Transactional
    public String saveImage(MultipartFile multipartFile, UserDetails userDetails) throws IOException {

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1));

        if (multipartFile.isEmpty()) {
            throw new IllegalArgumentException("사진이 없으면 사진을 저장할 수 없습니다.");
        }

        String fileName = generateFileName(multipartFile, user.getNickname());

        byte[] imageBytes = multipartFile.getBytes();

        // S3에 업로드
        uploadToS3(fileName, imageBytes, multipartFile.getContentType());

        // db 저장
        user.updateProfileImage(fileName);
        userRepository.save(user);

        return fileName;
    }

    public MultipartFile getImageFromS3(String fileName) {
        try {
            // S3에서 이미지 객체를 가져옵니다.
            S3Object s3Object = amazonS3Client.getObject(S3Bucket, fileName);

            // S3 객체에서 이미지 데이터를 읽습니다.
            byte[] imageBytes = IOUtils.toByteArray(s3Object.getObjectContent());

            // 바이트 배열을 ByteArrayInputStream으로 변환
            ByteArrayInputStream inputStream = new ByteArrayInputStream(imageBytes);

            // 임시 파일로 이미지를 저장합니다.
            File tempFile = File.createTempFile("tempImage", null);
            try (FileOutputStream fos = new FileOutputStream(tempFile)) {
                fos.write(imageBytes);
            }
            // 임시 파일을 MultipartFile로 변환합니다.
                MultipartFile multipartFile = new MockMultipartFile(fileName, fileName, null, new FileInputStream(tempFile));

            return multipartFile;
        } catch (Exception e) {
            throw new RuntimeException("이미지를 가져오지 못했습니다.");
        }
    }

    /**
     * S3 업로드 메서드
     */
    private void uploadToS3(String fileName, byte[] imageBytes, String contentType) {
        ObjectMetadata objectMetaData = new ObjectMetadata();
        objectMetaData.setContentType(contentType);
        objectMetaData.setContentLength(imageBytes.length);

        try {
            // S3에 업로드
            amazonS3Client.putObject(
                    new PutObjectRequest(S3Bucket, fileName, new ByteArrayInputStream(imageBytes), objectMetaData)
                            .withCannedAcl(CannedAccessControlList.PublicRead)
            );

//            String imagePath = amazonS3Client.getUrl(S3Bucket, fileName).toString(); // 접근 가능한 URL 가져오기

//            if (imagePath == null) {
//                throw new IllegalArgumentException("이미지 경로를 가져오지 못하였습니다.");
//            }

//            return imagePath;
        } catch (AmazonClientException e) {
            throw new RuntimeException("S3에 이미지를 업로드하는데 실패했습니다.", e);
        }
    }

    /**
     * 파일 이름 생성 메서드
     */
    private String generateFileName(MultipartFile multipartFile, String userNickname) {
        String originalName = multipartFile.getOriginalFilename();
        String fileExtension = getFileExtension(originalName);
        return userNickname + "_profile" + fileExtension;
    }

    /**
     * 파일 이름에서 확장자를 추출 메서드
     */
    private String getFileExtension(String fileName) {
        int dotIndex = fileName.lastIndexOf(".");
        if (dotIndex >= 0) {
            return fileName.substring(dotIndex);
        }

        throw new IllegalArgumentException("해당 파일의 확장자를 확인할 수 없습니다.");
    }

}
