package com.example.team3_final_project_server.configuration.jwt;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

// JWT 사용 시 application.property 에 있는 설정을 가져오기 위한 클래스
@Setter
@Getter
@Component
@ConfigurationProperties("jwt")
public class JwtProperties {
  private String issuer;
  private String secretKey;
}












