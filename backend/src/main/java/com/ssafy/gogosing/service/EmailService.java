package com.ssafy.gogosing.service;

import com.ssafy.gogosing.domain.user.User;
import com.ssafy.gogosing.dto.email.MailContentDto;
import com.ssafy.gogosing.global.redis.repository.CertificationNumberDao;
import com.ssafy.gogosing.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Random;

@RequiredArgsConstructor
@Service
public class EmailService {

    private final JavaMailSender javaMailSender;

    private final CertificationNumberDao certificationNumberDao;

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Value("${spring.mail.username}")
    private String senderEmail;

    public void sendCertificationNumber(String userEmail) throws Exception {

        if(userRepository.findByEmail(userEmail).isPresent())
            throw new Exception("이미 존재하는 이메일입니다.");

        MailContentDto mailContentDto = createCertificationMailAndSaveRedis(userEmail);
        sendMail(mailContentDto);
    }

    public MailContentDto createCertificationMailAndSaveRedis(String userEmail) throws NoSuchAlgorithmException {
        String certificationNumber = getCertificationNumber();

        String message = "";
        message += "<h3>" + "요청하신 인증 번호입니다." + "</h3>";
        message += "<h1>" + certificationNumber + "</h1>";
        message += "<h3>" + "감사합니다." + "</h3>";
        MailContentDto mailContentDto = MailContentDto.builder()
                .address(userEmail)
                .title("GoGoSing 인증 이메일 입니다.")
                .message(message).build();

        certificationNumberDao.saveCertificationNumber(userEmail, certificationNumber);

        return mailContentDto;
    }

    private static String getCertificationNumber() throws NoSuchAlgorithmException {
        Random random = new Random();

        // 6자리 숫자 생성
        String randomNumber = String.valueOf(100000 + random.nextInt(900000));

        return randomNumber;
    }

    public void verifyEmail(String certificationNumber, String email) {
        if (isVerify(certificationNumber, email)) {
            throw new RuntimeException("이메일 인증을 실패하였습니다.");
        }
    }

    private boolean isVerify(String certificationNumber, String email) {
        return !(certificationNumberDao.hasKey(email) &&
                certificationNumberDao.getCertificationNumber(email)
                        .equals(certificationNumber));
    }

    public void emailCheck(String userEmail) {

        userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new EmptyResultDataAccessException("존재하지 않는 이메일 입니다.", 1));

    }

    public MailContentDto createTempPasswordMailAndChangePassword(String userEmail){
        String tempPassword = getTempPassword();

        String message = "";
        message += "안녕하세요.<br/>요청하신 임시비밀번호 입니다.";
        message += "<div style='margin:100px;'>";
        message +=
                "<div align='center' style='border:1px solid black; font-family:verdana';>";
        message += "<div style='font-size:130%'>";
        message += "CODE : <strong>";
        message += tempPassword + "</strong><div><br/> ";
        message += "</div>";

        MailContentDto mailContentDto = MailContentDto.builder()
                .address(userEmail)
                .title("GoGoSing 임시비밀번호 안내 이메일 입니다.")
                .message(message).build();

        updatePassword(tempPassword, userEmail);
        return mailContentDto;
    }

    public void updatePassword(String tempPassword, String userEmail){
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(()-> new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1));
        user.updatePassword(tempPassword, passwordEncoder);
        userRepository.save(user);
    }

    public String getTempPassword(){
        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

        String str = "";

        int idx = 0;
        for (int i = 0; i < 10; i++) {
            idx = (int) (charSet.length * Math.random());
            str += charSet[idx];
        }
        return str;
    }

    public void sendMail(MailContentDto mailContentDto) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();

        try {
            message.setFrom(senderEmail);
            message.setRecipients(MimeMessage.RecipientType.TO, mailContentDto.getAddress());
            message.setSubject(mailContentDto.getTitle());
            message.setText(mailContentDto.getMessage(),"UTF-8", "html");
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        javaMailSender.send(message);
    }
}
