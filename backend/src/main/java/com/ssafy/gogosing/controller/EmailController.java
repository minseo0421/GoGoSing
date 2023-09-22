package com.ssafy.gogosing.controller;

import com.ssafy.gogosing.dto.email.MailContentDto;
import com.ssafy.gogosing.dto.email.request.CertifyEmailRequestDto;
import com.ssafy.gogosing.dto.email.request.SpendCertificationNumberRequestDto;
import com.ssafy.gogosing.dto.email.request.SpendTempPasswordRequestDto;
import com.ssafy.gogosing.service.EmailService;
import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@Getter
@RequestMapping("/email")
public class EmailController {

    private final EmailService emailCertificationService;

    @ApiOperation(value = "이메일 인증번호 전송")
    @PostMapping("/send-certification")
    public ResponseEntity<?> sendCertificationNumber(@Valid @RequestBody SpendCertificationNumberRequestDto spendEmailRequestDto) throws Exception {

        MailContentDto mailContentDto = emailCertificationService.createCertificationMailAndSaveRedis(spendEmailRequestDto.getEmail());
        emailCertificationService.sendMail(mailContentDto);

        return ResponseEntity.ok().body("이메일 인증번호가 전송 완료되었습니다.");
    }

    @ApiOperation(value = "이메일 인증")
    @PostMapping("/verify")
    public ResponseEntity<?> verifyCertificationNumber(@Valid @RequestBody CertifyEmailRequestDto certifyEmailRequestDto) {

        emailCertificationService.verifyEmail(certifyEmailRequestDto.getCertificationNumber(), certifyEmailRequestDto.getEmail());

        return ResponseEntity.ok().body("인증이 완료되었습니다.");
    }

    @ApiOperation(value = "임시 비밀번호 발급")
    @PostMapping("/tempPassword")
    public ResponseEntity<?> sendTempPassword(@Valid @RequestBody SpendTempPasswordRequestDto tempPasswordRequestDto) throws MessagingException {
        emailCertificationService.emailCheck(tempPasswordRequestDto.getEmail());
        MailContentDto mailContentDto = emailCertificationService.createTempPasswordMailAndChangePassword(tempPasswordRequestDto.getEmail());
        emailCertificationService.sendMail(mailContentDto);

        return ResponseEntity.ok().body("임시 비밀번호 발급이 완료되었습니다.");
    }
}
