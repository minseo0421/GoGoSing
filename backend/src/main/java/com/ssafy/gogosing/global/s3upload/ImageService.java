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
import java.net.URLDecoder;

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
    public String saveProfileImage(MultipartFile multipartFile, UserDetails userDetails) throws IOException {

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1));

        if (multipartFile.isEmpty()) {
            throw new IllegalArgumentException("사진이 없으면 사진을 저장할 수 없습니다.");
        }

        String fileName = generateFileName(multipartFile, user.getNickname());

        byte[] imageBytes = multipartFile.getBytes();

        // S3에 업로드
        String imagePath = uploadToS3(fileName, imageBytes, multipartFile.getContentType());

        // db 저장
        user.updateProfileImage(imagePath);
        userRepository.save(user);

        return imagePath;
    }

    /**
     * S3 업로드 메서드
     */
    private String uploadToS3(String fileName, byte[] imageBytes, String contentType) {
        ObjectMetadata objectMetaData = new ObjectMetadata();
        objectMetaData.setContentType(contentType);
        objectMetaData.setContentLength(imageBytes.length);

        try {
            // S3에 업로드
            amazonS3Client.putObject(
                    new PutObjectRequest(S3Bucket, fileName, new ByteArrayInputStream(imageBytes), objectMetaData)
                            .withCannedAcl(CannedAccessControlList.PublicRead)
            );

            String imagePath = amazonS3Client.getUrl(S3Bucket, fileName).toString(); // 접근 가능한 URL 가져오기

            if (imagePath == null) {
                throw new IllegalArgumentException("이미지 경로를 가져오지 못하였습니다.");
            }

            return imagePath;
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

    @Transactional
    public String updateProfileImage(MultipartFile multipartFile, UserDetails userDetails) throws IOException {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1));

        if(!extractFileNameFromUrl(user.getProfileImg()).equals("DefaultProfile.png")) {
            deleteImage(user.getProfileImg());
        }

        return saveProfileImage(multipartFile, userDetails);
    }

    @Transactional
    public void deleteProfileImage(UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1));

        if(!extractFileNameFromUrl(user.getProfileImg()).equals("DefaultProfile.png")) {
            deleteImage(user.getProfileImg());
        }

        user.updateProfileImage("https://gogosing.s3.ap-northeast-2.amazonaws.com/DefaultProfile.png");
        userRepository.save(user);
    }

    public void deleteImage(String imageUrl) {
        // 이미지가 존재하면 버킷에서 해당 이미지를 삭제
        String existFile = extractFileNameFromUrl(imageUrl);
        System.out.println(existFile);
        try {
            String decodedFileName = URLDecoder.decode(existFile, "UTF-8");
            amazonS3Client.deleteObject(S3Bucket, decodedFileName);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }

    // URL에서 파일 이름 추출
    private String extractFileNameFromUrl(String imageUrl) {
        // URL의 마지막 슬래시 이후의 문자열
        return imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
    }

}
