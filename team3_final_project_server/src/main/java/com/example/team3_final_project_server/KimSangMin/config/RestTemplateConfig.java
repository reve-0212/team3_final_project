package com.example.team3_final_project_server.KimSangMin.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RestTemplateConfig  {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}