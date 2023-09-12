package com.ssafy.gogosing.controller;

import com.ssafy.gogosing.dto.email.request.CertifyEmailRequestDto;
import com.ssafy.gogosing.dto.email.request.SpendEmailRequestDto;
import com.ssafy.gogosing.service.EmailCertificationService;
import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@Getter
@RequestMapping("/api/email")
public class EmailController {

    private final EmailCertificationService emailCertificationService;

    @ApiOperation(value = "이메일 인증번호 전송")
    @PostMapping("/send-certification")
    public ResponseEntity<?> sendCertificationNumber(@Valid @RequestBody SpendEmailRequestDto spendEmailRequestDto) throws Exception {

        emailCertificationService.sendEmailForCertification(spendEmailRequestDto.getEmail());

        return ResponseEntity.ok().body("");
    }

    @ApiOperation(value = "이메일 인증")
    @PostMapping("/verify")
    public ResponseEntity<?> verifyCertificationNumber(@Valid @RequestBody CertifyEmailRequestDto certifyEmailRequestDto) {

        emailCertificationService.verifyEmail(certifyEmailRequestDto.getCertificationNumber(), certifyEmailRequestDto.getEmail());

        return ResponseEntity.ok().body("인증이 완료되었습니다.");
    }
}
