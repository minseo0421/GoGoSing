package com.ssafy.gogosing.service;

import com.amazonaws.AmazonClientException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.gogosing.domain.music.Music;
import com.ssafy.gogosing.domain.user.User;
import com.ssafy.gogosing.dto.music.response.VoiceMatchingListResponseDto;
import com.ssafy.gogosing.repository.MusicRepository;
import com.ssafy.gogosing.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.exec.DefaultExecutor;
import org.apache.commons.exec.PumpStreamHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.apache.commons.exec.CommandLine;

import javax.sound.sampled.AudioFileFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.UnsupportedAudioFileException;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MusicAnalyzeService {

    @Value("${python.file.path}")
    private String pythonPath;

    @Autowired
    AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String S3Bucket;

    private final UserRepository userRepository;

    private final MusicRepository musicRepository;

    /**
     * 파이썬을 음역대 저장
     */
    @Transactional
    public String saveVoice(MultipartFile multipartFile, UserDetails userDetails) throws IOException {

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1));

        if (multipartFile.isEmpty()) {
            throw new IllegalArgumentException("음성파일이 없으면 음역대를 저장할 수 없습니다.");
        }

        try {

            String fileName = generateFileName(multipartFile, user.getNickname());

            byte[] fileBytes = multipartFile.getBytes();

            // S3에 업로드
            String filePath = uploadToS3(fileName, fileBytes, multipartFile.getContentType());

            user.updateVoiceFile(filePath);

            return filePath;

            // 여기에서 WAV 파일을 사용하여 추가 처리를 수행할 수 있습니다.
        } catch (AmazonClientException e) {
            throw new RuntimeException("S3에 음성을 업로드하는데 실패했습니다.", e);
        }
    }

    /**
     * S3 업로드 메서드
     */
    private String uploadToS3(String fileName, byte[] fileBytes, String contentType) {
        ObjectMetadata objectMetaData = new ObjectMetadata();
        objectMetaData.setContentType(contentType);
        objectMetaData.setContentLength(fileBytes.length);

        try {
            // S3에 업로드
            amazonS3Client.putObject(
                    new PutObjectRequest(S3Bucket, fileName, new ByteArrayInputStream(fileBytes), objectMetaData)
                            .withCannedAcl(CannedAccessControlList.PublicRead)
            );

            String filePath = amazonS3Client.getUrl(S3Bucket, fileName).toString(); // 접근 가능한 URL 가져오기

            if (filePath == null) {
                throw new IllegalArgumentException("이미지 경로를 가져오지 못하였습니다.");
            }

            return filePath;
        } catch (AmazonClientException e) {
            throw new RuntimeException("S3에 파일을 업로드하는데 실패했습니다. " + e.getMessage(), e);
        }
    }

    public List<VoiceMatchingListResponseDto> processVoiceAndReturnPath(String voiceFile) throws IOException {

        System.out.println("Python Call");
        String[] command = new String[4];
        command[0] = "python";
        command[1] = pythonPath;
        command[2] = voiceFile;

        String result = execPython(command);

        // 결과 값을 List에 저장
        String[] resultLines = result.trim().split("\n");

        List<VoiceMatchingListResponseDto> voiceMatchingList = new ArrayList<>();

        // 일단 10개 추천
        for (int i = 0; i < 10; i++) {
            try {
                Long value = Long.valueOf(resultLines[i].split("\\.")[0]);
                Music music = musicRepository.findById(value)
                        .orElseThrow(() -> new EmptyResultDataAccessException("해당 노래는 존재하지 않습니다.", 1));
                VoiceMatchingListResponseDto voiceMatchingListResponseDto = VoiceMatchingListResponseDto.builder()
                        .musicId(music.getId())
                        .singer(music.getSinger())
                        .songImg(music.getSongImg())
                        .title(music.getTitle())
                        .build();
                voiceMatchingList.add(voiceMatchingListResponseDto);
            } catch (NumberFormatException e) {
                // 파싱 오류 처리
                e.printStackTrace();
            }
        }

        return voiceMatchingList;
    }

    public String execPython(String[] command) throws IOException {
        CommandLine commandLine = CommandLine.parse(command[0]);
        for(int i = 1, n = command.length; i < n; i++) {
            commandLine.addArgument(command[i]);
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        PumpStreamHandler pumpStreamHandler = new PumpStreamHandler(outputStream);
        DefaultExecutor executor = new DefaultExecutor();
        executor.setStreamHandler(pumpStreamHandler);
        executor.execute(commandLine);

        return outputStream.toString();
    }

    /**
     * 파일 이름 생성 메서드
     */
    private String generateFileName(MultipartFile multipartFile, String userNickname) {
        String originalName = multipartFile.getOriginalFilename();
        String fileExtension = getFileExtension(originalName);
        return userNickname + "_voicefile" + fileExtension;
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
