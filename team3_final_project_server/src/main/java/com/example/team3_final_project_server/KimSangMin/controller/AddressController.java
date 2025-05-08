package com.example.team3_final_project_server.KimSangMin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URLEncoder;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AddressController {

    private static final Logger logger = LoggerFactory.getLogger(AddressController.class);

    @Autowired
    private RestTemplate restTemplate;

    private final String API_KEY = "36bd79108879c504308c80d28fe7829d";

    // 카카오 주소 검색 api
    @GetMapping("/kakao/address")
    public ResponseEntity<?> searchAddress(@RequestParam String query) {
        try {
            // URL 인코딩
            String encodedQuery = URLEncoder.encode(query, "UTF-8");
            String apiUrl = "https://dapi.kakao.com/v2/local/search/address.json?query=" + encodedQuery;
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "KakaoAK " + API_KEY);  // 카카오 REST API 키 입력

            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.GET, entity, String.class);

            // 응답 결과 로그 출력 (디버깅용)
            logger.info("Response status code: {}", response.getStatusCode());
            logger.info("Response body: {}", response.getBody());

            return ResponseEntity.ok(response.getBody());  // 응답 결과를 그대로 반환
        } catch (Exception e) {
            // 오류 발생 시, 에러 메시지와 함께 상태 코드 500 반환
            logger.error("Error occurred while searching address", e);
            return ResponseEntity.status(500).body("주소 검색 중 오류 발생: " + e.getMessage());
        }
    }





}
