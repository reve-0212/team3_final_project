package com.example.team3_final_project_server.configuration.jwt;

import com.example.team3_final_project_server.dto.UserDTO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.context.support.BeanDefinitionDsl;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.Duration;
import java.util.*;

// 실제 JWT 토큰을 생성 및 검증하는 메소드가 있는 클래스
@RequiredArgsConstructor
@Service
public class JwtTokenProvider {

  private final JwtProperties jwtProperties;

  //  JWT 토큰 생성, 매개변수로 사용자 정보와 만료 시간을 받아서 사용
  public String generateToken(UserDTO userDTO, Duration expiredAt) {
    Date now = new Date();

//    실제 JWT 토큰을 생성, 매개변수로 토큰 만료시간과 사용자 정보를 받음
    return makeToken(new Date(now.getTime() + expiredAt.toMillis()), userDTO);
  }

  public String generateRefreshToken(UserDTO userDTO, Duration expiredAt) {
    Date now = new Date();

    // 리프레시 토큰도 동일한 방식으로 생성
    return makeToken(new Date(now.getTime() + expiredAt.toMillis()), userDTO);
  }

  //  실제 JWT 토큰을 생성
  private String makeToken(Date expiry, UserDTO userDTO) {
    Date now = new Date();

//    JWT 토큰에 데이터를 저장하기 위한 Map 방식의 데이터를 생성
    Map<String, Object> claims = new HashMap<>();
    claims.put("userIdx", userDTO.getUserIdx());
    claims.put("userId", userDTO.getUserId());
    claims.put("userPass", userDTO.getUserPass());
    claims.put("userNick", userDTO.getUserNick());
    claims.put("userGender", userDTO.getUserGender());
    claims.put("userAge", userDTO.getUserAge());
    claims.put("userCall", userDTO.getUserCall());
    claims.put("userEmail", userDTO.getUserEmail());
    claims.put("role", userDTO.getRole());
//    빌더 패턴을 사용하여 JWT 객체 생성

//    setHeaderParam() : 토큰 타입을 설정
//    setIssuer() : 해당 토큰의 발행자 설정
//    setIssuedAt() : 해당 토큰의 생성 시간 설정
//    setExpiration() : 해당 토큰의 만료 시간 설정
//    setSubject() : 해당 토큰의 사용 주체 설정(사용자를 구분할 수 있는 어떠한 데이터도 가능)

//    addClaims() : 해당 토큰에 저장할 데이터 설정 (여러개의 데이터를 한번에 입력)
//    claim() : 해당 토큰에 저장할 데이터 설정 (한개의 데이터를 입력)

//    signWith() : 해당 토큰의 암호화 방식 설정, 암호화된 문자열의 복호 및 검증 시 사용할 비밀키 추가
//    compact() : 해당 토큰의 문자열로 변환

//    jjwt 0.12.x 버전 사용 시 암호화 알고리즘 사용 방식이 변경됨
    Key secretKey = Keys.hmacShaKeyFor(jwtProperties.getSecretKey().getBytes());

    return Jwts.builder()
            .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
            .issuer(jwtProperties.getIssuer())
            .issuedAt(now)
            .expiration(expiry)
            .subject(userDTO.getUserEmail())
            .claims(claims)
            .signWith(secretKey)
            .compact();
  }

  //  JWT 토큰 검증
  public boolean validToken(String token) {
    try {
//      JWT 토큰 파싱 시작
//      jjwt 0.9.x 버전 사용 시
//      Jwts.parser()
////          JWT 토큰 생성 시 암호화할 때 사용할 비밀키 설정
//          .setSigningKey(jwtProperties.getSecretKey())
////          JWT 토큰 데이터 파싱
//          .parseClaimsJws(token);

//      jjwt 0.12.x 버전 사용 시
      Key secretKey = Keys.hmacShaKeyFor(jwtProperties.getSecretKey().getBytes());

      Jwts.parser()
              .setSigningKey(secretKey)
              .build() // build() 를 먼저 실행해 줌
              .parseClaimsJws(token);

      return true;
    } catch (Exception e) {
      return false;
    }
  }

  //  매개변수로 받은 JWT 토큰에서 사용자 인증 정보를 가져옴
  public Authentication getAuthentication(String token) {
//    JWT 토큰에서 실제 데이터인 Claim 정보를 가져옴
    Claims claims = getClaims(token);

//    JWT 토큰에 저장되어 있었던 사용자 권한 정보를 가져와서 스프링 시큐리티에서 사용하는 권한 타입으로 변환
    Set<SimpleGrantedAuthority> authorities = Collections.singleton(new SimpleGrantedAuthority(claims.get("role").toString()));
    System.out.println("authorities : " + authorities);

//    jwt 토큰을 통해서 가져온 데이터로 UserDTO 객체 생성
    UserDTO member = UserDTO.builder()
            .userIdx(((Number) claims.get("userIdx")).intValue())
            .userId(claims.get("userId").toString())
            .userPass(claims.get("userPass").toString())
            .userNick(claims.get("userNick").toString())
            .userGender(claims.get("userGender").toString())
            .userAge(((Number) claims.get("userAge")).intValue())
            .userCall(claims.get("userCall").toString())
            .userEmail(claims.get("userEmail").toString())
            .role(claims.get("role").toString())
            .build();

//    사용자 인증 정보를 생성 후 반환
    return new UsernamePasswordAuthenticationToken(member, token, authorities);
  }

  //  매개변수로 받은 JWT 토큰을 파싱하여 데이터를 출력
  private Claims getClaims(String token) {
//    JWT 토큰 파싱 시작
//    jjwt 0.9.x 버전 사용 시
//    return Jwts.parser()
////        암호화 시 사용한 비밀키 설정, 키가 다르면 오류 발생
//        .setSigningKey(jwtProperties.getSecretKey())
////        JWT 토큰 문자열 파싱
//        .parseClaimsJws(token)
////        JWT 토큰에 저장된 데이터 출력
//        .getBody();

//    jjwt 0.12.x 버전 사용 시
    Key secretKey = Keys.hmacShaKeyFor(jwtProperties.getSecretKey().getBytes());

    return Jwts.parser()
            .setSigningKey(secretKey)
            .build()
            .parseClaimsJws(token)
            .getBody();
  }

//  public Long getUserId(String token) {
//    Claims claims = getClaims(token);
//    return claims.get("id", Long.class);
//  }
}