package com.ssafy.gogosing.service;

import com.amazonaws.AmazonClientException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.gogosing.domain.music.Music;
import com.ssafy.gogosing.domain.analyze.MusicRangeAnalyze;
import com.ssafy.gogosing.domain.user.User;
import com.ssafy.gogosing.dto.analyze.response.SingingRoomVoiceResponseDto;
import com.ssafy.gogosing.dto.analyze.response.VoiceRangeMatchingMusicDto;
import com.ssafy.gogosing.dto.analyze.response.VoiceRangeMatchingResponseDto;
import com.ssafy.gogosing.dto.analyze.response.VoiceWaveMatchingResponseDto;
import com.ssafy.gogosing.domain.analyze.VoiceWaveMatching;
import com.ssafy.gogosing.repository.AnalyzeRepository.VoiceWaveMatchingRepository;
import com.ssafy.gogosing.repository.AnalyzeRepository.MusicRangeAnalyzeRepository;
import com.ssafy.gogosing.repository.MusicRepository;
import com.ssafy.gogosing.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.exec.DefaultExecutor;
import org.apache.commons.exec.PumpStreamHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.exec.CommandLine;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AnalyzeService {

    @Value("${python.file.path}")
    private String voiceWaveAnalyzePythonPath;

    @Value("${python.file.path2}")
    private String voiceRangeAnalyzePythonPath;

    @Value("${python.file.path3}")
    private String singingRoomVoicePythonPath;

    @Value("${python.exe.path}")
    private String pythonPath;

    @Autowired
    AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String S3Bucket;

    private final UserRepository userRepository;

    private final MusicRepository musicRepository;

    private final MusicRangeAnalyzeRepository musicRangeAnalyzeRepository;

    private final VoiceWaveMatchingRepository userVoiceWaveMatchingRepository;

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
     * 음역대 분석을 위한 음성 url을 넘겨서 파이썬 파일을 실행시키기 위한 임시 음성 파일 s3 저장
     */
    @Transactional
    public String saveVoiceTemp(MultipartFile multipartFile, UserDetails userDetails) throws IOException {

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1));

        if (multipartFile.isEmpty()) {
            throw new IllegalArgumentException("음성파일이 없으면 음역대를 저장할 수 없습니다.");
        }

        try {

            String fileName = generateTempFileName(multipartFile, user.getNickname());

            byte[] fileBytes = multipartFile.getBytes();

            // S3에 업로드
            String filePath = uploadToS3(fileName, fileBytes, multipartFile.getContentType());

            return filePath;

        } catch (AmazonClientException e) {
            throw new RuntimeException("S3에 음성을 업로드하는데 실패했습니다.", e);
        }
    }

    /**
     * 음역대 분석 후 음역대 저장 및 결과 출력
     */
    @Transactional
    public VoiceRangeMatchingResponseDto getVoiceRangeMatching(String voiceFile, UserDetails userDetails) throws IOException {

        System.out.println("Python Call");
        String[] command = new String[4];
        command[0] = pythonPath;
        command[1] = voiceRangeAnalyzePythonPath;
        command[2] = voiceFile;

        String result = execPython(command);

        // 결과 값을 List에 저장
        String[] resultLines = result.trim().split("\n");

        String voiceRangeHighest = resultLines[3].trim();
        String voiceRangeLowest = resultLines[1].trim();
        String voiceRangeNum = resultLines[2].trim();

        List<MusicRangeAnalyze> musicList = musicRangeAnalyzeRepository.findMatchingListByMaxPitch(Double.parseDouble(voiceRangeNum));

        Music music = musicRepository.findById(musicList.get(0).getMusicId())
                        .orElseThrow(() -> new EmptyResultDataAccessException("해당 노래는 존재하지 않습니다.", 1));

        VoiceRangeMatchingMusicDto voiceRangeMatchingMusicDto = VoiceRangeMatchingMusicDto.builder()
                .musicId(music.getId())
                .singer(music.getSinger())
                .songImg(music.getSongImg())
                .title(music.getTitle())
                .build();

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1));

        user.updateVoiceRange(voiceRangeHighest, voiceRangeLowest, voiceRangeNum);
        userRepository.save(user);

        VoiceRangeMatchingResponseDto voiceRangeMatchingResponseDto = VoiceRangeMatchingResponseDto.builder()
                .voiceRangeHighest(voiceRangeHighest)
                .voiceRangeLowest(voiceRangeLowest)
                .voiceRangeMatchingMusic(voiceRangeMatchingMusicDto)
                .build();

        return voiceRangeMatchingResponseDto;
    }

    /**
     * 음역대 분석 결과 기반한 노래 리스트 반환
     */
    public List<VoiceRangeMatchingMusicDto> getVoiceRangeMatchingMusicList(UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1));

        List<MusicRangeAnalyze> analyzesResultList = musicRangeAnalyzeRepository.findMatchingListByMaxPitch(user.getMaxPitch());

        List<VoiceRangeMatchingMusicDto> voiceRangeMatchingMusicList = new ArrayList<>();

        for(int i = 0; i < analyzesResultList.size(); i++) {
            Music music = musicRepository.findById(analyzesResultList.get(i).getMusicId())
                    .orElseThrow(() -> new EmptyResultDataAccessException("해당 노래는 존재하지 않습니다.", 1));

            VoiceRangeMatchingMusicDto voiceRangeMatchingMusicDto = VoiceRangeMatchingMusicDto.builder()
                    .musicId(music.getId())
                    .singer(music.getSinger())
                    .songImg(music.getSongImg())
                    .title(music.getTitle())
                    .build();

            voiceRangeMatchingMusicList.add(voiceRangeMatchingMusicDto);
        }

        return voiceRangeMatchingMusicList;
    }

    /**
     * 파형 분석 후 음성파일 저장 및 파형과 가장 유사한 노래 출력
     */
    public VoiceWaveMatchingResponseDto getVoiceWaveMatchingMusic(String voiceFile, UserDetails userDetails) throws IOException {

        System.out.println("Python Call");
        String[] command = new String[4];
        command[0] = pythonPath;
        command[1] = voiceWaveAnalyzePythonPath;
        command[2] = voiceFile;

        String result = execPython(command);

        // 결과 값을 List에 저장
        String[] resultLines = result.trim().split("\n");

        List<VoiceWaveMatchingResponseDto> voiceMatchingList = new ArrayList<>();

        // 일단 10개 추천
        for (int i = 0; i < 10; i++) {
            try {
                Long value = Long.valueOf(resultLines[i].split("\\.")[0]);
                Music music = musicRepository.findById(value)
                        .orElseThrow(() -> new EmptyResultDataAccessException("해당 노래는 존재하지 않습니다.", 1));
                VoiceWaveMatchingResponseDto voiceWaveMatchingResponseDto = VoiceWaveMatchingResponseDto.builder()
                        .musicId(music.getId())
                        .singer(music.getSinger())
                        .songImg(music.getSongImg())
                        .title(music.getTitle())
                        .build();
                voiceMatchingList.add(voiceWaveMatchingResponseDto);
            } catch (NumberFormatException e) {
                // 파싱 오류 처리
                e.printStackTrace();
            }
        }

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1));

        // 기존 데이터를 삭제합니다.
        userVoiceWaveMatchingRepository.deleteByUserId(user.getId());

        VoiceWaveMatching userVoiceWaveMatching = VoiceWaveMatching.builder()
                .userId(user.getId())
                .voiceWaveMatchingResponseDtoList(voiceMatchingList)
                .build();

        userVoiceWaveMatchingRepository.save(userVoiceWaveMatching);

        return voiceMatchingList.get(0);
    }

    /**
     * 파형 분석 결과 기반한 노래 리스트 반환
     */
    public List<VoiceWaveMatchingResponseDto> getVoiceWaveAnalyzeMusicList(UserDetails userDetails) {

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1));

        VoiceWaveMatching userVoiceWaveMatching = userVoiceWaveMatchingRepository.findByUserId(user.getId())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저는 분석을 진행하지 않았습니다.", 1));

        return userVoiceWaveMatching.getVoiceWaveMatchingResponseDtoList();
    }

    public SingingRoomVoiceResponseDto getSingingRoomVoice(String voiceFile, String url, UserDetails userDetails) throws IOException {

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new EmptyResultDataAccessException("존재하지 않는 유저 입니다.", 1));

        System.out.println("Python Call");
        String[] command = new String[5];
        command[0] = pythonPath;
        command[1] = singingRoomVoicePythonPath;
        command[2] = voiceFile;
        command[3] = url;
        command[4] = String.valueOf(user.getId());

        String result = execPython(command);

        SingingRoomVoiceResponseDto singingRoomVoiceResponseDto = SingingRoomVoiceResponseDto.builder()
                .voiceUrl(result.replace("\r\n", ""))
                .build();

        return singingRoomVoiceResponseDto;
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
     * 임시 파일 이름 생성 메서드
     */
    private String generateTempFileName(MultipartFile multipartFile, String userNickname) {
        String originalName = multipartFile.getOriginalFilename();
        String fileExtension = getFileExtension(originalName);
        return userNickname + "_voiceTempfile" + fileExtension;
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
