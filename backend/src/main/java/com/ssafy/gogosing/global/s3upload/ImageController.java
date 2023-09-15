package com.ssafy.gogosing.global.s3upload;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@Getter
@RequestMapping("/api/image")
public class ImageController {

    private final ImageService imageService;

    @PostMapping("/save")
    public ResponseEntity<?> saveImage(@RequestParam("s3upload") MultipartFile multipartFile,
                                       @AuthenticationPrincipal UserDetails userDetails) throws Exception {

        return ResponseEntity.ok().body(imageService.saveImage(multipartFile, userDetails));
    }
}
