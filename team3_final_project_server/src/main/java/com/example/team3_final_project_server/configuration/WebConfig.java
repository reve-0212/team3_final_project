package com.example.team3_final_project_server.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
// WebMvcConfigurer 는 SpringMVC 의 설정을 커스터마이징 가능
//즉 CORS 설정을 변경하고 있음
public class WebConfig implements WebMvcConfigurer {

    @Override
//    addCorsMappings : CORS 설정을 추가하는 메서드
    public void addCorsMappings(CorsRegistry registry) {
//              registry.addMapping("/**") : 모든 경로에 대해 CORS를 허용
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173","http://54.180.178.82:5173","http://54.180.178.82:8080")  // http://localhost:5173 에서 오는 요청만 허용 // aws 리액트가 있는 서버 ip로 바꾸면 됨
                .allowedMethods("GET", "POST", "PUT", "DELETE","*")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}