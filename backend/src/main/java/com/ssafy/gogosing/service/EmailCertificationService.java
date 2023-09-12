package com.ssafy.gogosing.service;

import com.ssafy.gogosing.global.redis.repository.CertificationNumberDao;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

@RequiredArgsConstructor
@Service
public class EmailCertificationService {

    private final JavaMailSender javaMailSender;
    private final CertificationNumberDao certificationNumberDao;
    private static final String MAIL_TITLE_CERTIFICATION = "계정 인증을 위한 링크";
    private static final String DOMAIN_NAME = "http://localhost:8081/api/email";

    @Value("${spring.mail.username}")
    private String senderEmail;


    public void sendEmailForCertification(String email) throws NoSuchAlgorithmException, MessagingException {

        String certificationNumber = getCertificationNumber();

//        String content = String.format("%s/verify?certificationNumber=%s&email=%s   링크를 5분 이내에 클릭해주세요.", DOMAIN_NAME, certificationNumber, email);
//        sendMail(email, content);
        sendMail(email, certificationNumber);
        certificationNumberDao.saveCertificationNumber(email, certificationNumber);
    }

    private static String getCertificationNumber() throws NoSuchAlgorithmException {
        String result;

        do {
            int i = SecureRandom.getInstanceStrong().nextInt(999999);
            result = String.valueOf(i);
        } while (result.length() != 6);

        return result;
    }

    private void sendMail(String email, String number) throws MessagingException {
//        MimeMessage mimeMessage = mailSender.createMimeMessage();
//        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
//        helper.setTo(email);
//        helper.setSubject(MAIL_TITLE_CERTIFICATION);
//        helper.setText(number);
        MimeMessage message = javaMailSender.createMimeMessage();

        try {
            message.setFrom(senderEmail);
            message.setRecipients(MimeMessage.RecipientType.TO, email);
            message.setSubject("이메일 인증");
            String body = "";
            body += "<h3>" + "요청하신 인증 번호입니다." + "</h3>";
            body += "<h1>" + number + "</h1>";
            body += "<h3>" + "감사합니다." + "</h3>";
            message.setText(body,"UTF-8", "html");
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        javaMailSender.send(message);
    }

    public void verifyEmail(String certificationNumber, String email) {
        if (isVerify(certificationNumber, email)) {
            throw new RuntimeException("인증 실패");
        }
        certificationNumberDao.removeCertificationNumber(email);
    }

    private boolean isVerify(String certificationNumber, String email) {
        return !(certificationNumberDao.hasKey(email) &&
                certificationNumberDao.getCertificationNumber(email)
                        .equals(certificationNumber));
    }
}
