//package com.example.team3_final_project_server.configuration.jwt;
//
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//
//// JWT 인증을 위해서 사용자가 만든 스프링 시큐리티 커스텀 필터
//// JWT 토큰 정보 검증을 위해서 사용함
//// OncePerRequestFilter : 스프링 시큐리티에서 제공하는 필터로 사용자 요청 시 한번만 실행하는 필터
//@RequiredArgsConstructor
//public class JwtTokenAuthenticationFilter extends OncePerRequestFilter {
//
//  private final JwtTokenProvider jwtTokenProvider;
//
////  JWT 토큰 사용 시 Request 객체의 header에 Authorization 라는 키로 토큰 정보가 들어가 있음
//  private final static String HEADER_AUTHORIZATION = "Authorization";
////  JWT 토큰 사용 시 첫번째 단어로 Bearer 가 적혀 있음
////  Bearer 를 제외한 나머지 문자열이 실제 JWT 토큰 문자열 임
////  'Bearer ' 로 총 7자임
//  private final static String TOKEN_PREFIX = "Bearer ";
//
////  OncePerRequestFilter 에서 상속받은 메소드, 필터 동작 시 실행되는 메소드
//  @Override
//  protected void doFilterInternal(
//      HttpServletRequest request,
//      HttpServletResponse response,
//      FilterChain filterChain)  throws ServletException, IOException {
//
//    // /api/dummy/** 요청은 토큰 검사 없이 바로 통과 (없애야함) 히스토리 더미 데이터 용
////    String path = request.getRequestURI();
////    if (path.startsWith("/api/dummy")) {
////      filterChain.doFilter(request, response);
////      return;
////    }
//
////    클라이언트에서 전달받은 request 객체에서 Authorization 키에 저장된 문자열을 가져옴
//    String authorizationHeader = request.getHeader(HEADER_AUTHORIZATION);
//
////    'Bearer ' 를 제거한 JWT 토큰 문자열을 가져옴
//    String token = getAccessToken(authorizationHeader);
//
////    파싱된 JWT 토큰 정보를 검증
//    if (jwtTokenProvider.validToken(token)) {
////      JWT 토큰에 저장된 사용자 인증 정보를 출력
//      Authentication authentication = jwtTokenProvider.getAuthentication(token);
//
////      가져온 인증 정보를 스프링 시큐리티에 저장
////      SecurityContextHolder : 스프링 시큐리티에서 인증 정보를 보관하는 클래스
////      getContext() : 스프링 시큐리티의 현재 사용자의 context를 가져옴
////      setAuthentication() : 인증 정보를 저장하는 메소드
//      SecurityContextHolder.getContext().setAuthentication(authentication);
//    }
//
////    다음 필터 실행
//    filterChain.doFilter(request, response);
//  }
//
////  request 객체의 header에 저장된 jwt 토큰 정보를 매개변수로 받아서 실제 JWT 토큰 정보만 출력
//  private String getAccessToken(String authorizationHeader) {
////    requestr 객체의 header 정보가 있는지 확인, Bearer 로 시작하는 문자열이 있는지 확인
//    if (authorizationHeader != null && authorizationHeader.startsWith(TOKEN_PREFIX)) {
////      매개변수로 전달받은 문자열 중에서 Bearer 로 시작하는 문자열 중 Bearer 글자를 삭제하고 나머지 문자열만 가져옴
//      return authorizationHeader.substring(TOKEN_PREFIX.length());
//    }
//    return null;
//  }
//}
//
//
//
//
//
//
//
//
//
//
//
//
