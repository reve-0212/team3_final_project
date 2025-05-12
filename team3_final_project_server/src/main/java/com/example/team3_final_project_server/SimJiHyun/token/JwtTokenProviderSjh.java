//package com.example.team3_final_project_server.SimJiHyun.token;
//
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import org.springframework.stereotype.Component;
//
//import java.util.Date;
//
//@Component
//public class JwtTokenProviderSjh {
//  private final String secretKey = "bisper-jwt-test-token-secret-key";
//  private final long accessTokenValidity = 1000L * 60 * 30;
//  private final long refreshTokenValidity = 1000L * 60 * 60 * 24 * 7;
//
//  public String createAccessToken(String userId, String role){
//    return Jwts.builder()
//            .setSubject(userId)
//            .claim("role",role)
//            .setIssuedAt(new Date())
//            .setExpiration(new Date(System.currentTimeMillis() + accessTokenValidity))
//            .signWith(SignatureAlgorithm.HS256, secretKey)
//            .compact();
//  }
//
//  public String createRefreshToken(){
//    return Jwts.builder()
//            .setIssuedAt(new Date())
//            .setExpiration(new Date(System.currentTimeMillis() + refreshTokenValidity))
//            .signWith(SignatureAlgorithm.HS256, secretKey)
//            .compact();
//  }
//}
