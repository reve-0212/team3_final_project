package com.example.team3_final_project_server.configuration;

import com.example.team3_final_project_server.configuration.jwt.JwtTokenAuthenticationFilter;
import com.example.team3_final_project_server.configuration.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import static org.springframework.boot.autoconfigure.security.servlet.PathRequest.toH2Console;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
  private final JwtTokenProvider jwtTokenProvider;

//  비밀번호를 암호화하기 해서 스프링 빈으로 등록
  @Bean
  public BCryptPasswordEncoder bCryptPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }

//  JWT 토큰에 대한 정보를 스프링 시큐리티 필터 체인에서 사용하기 위해서 스프링 빈으로 등록
  @Bean
  public JwtTokenAuthenticationFilter jwtTokenAuthenticationFilter() {
    return new JwtTokenAuthenticationFilter(jwtTokenProvider);
  }

//  사용자 인증 정보를 사용하기 위해서 스프링 빈으로 등록
  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
    return authenticationConfiguration.getAuthenticationManager();
  }

//  cors 설정을 스프링 MVC 전역으로 사용할 수 있도록 스프링 빈으로 등록
  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
//    cors 허용할 주소
    configuration.addAllowedOrigin("http://localhost:5173");
    configuration.addAllowedOrigin("http://localhost:5174");
//    cors 허용할 메소드 (GET, POST, PUT, DELETE)
    configuration.addAllowedMethod("*");
//    cors 허용할 헤더 (여기서는 Authorization 부분이 필요하기 때문에 추가함)
    configuration.addAllowedHeader("*");
//    cors 허용할 인증 권한
    configuration.setAllowCredentials(true);

//    모든 경로에 대해서 cors 설정을 허용함
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }

//  스프링 시큐리티에서 제외할 항목 설정
  @Bean
  public WebSecurityCustomizer configure() {
    return web -> web.ignoring()
        .requestMatchers(toH2Console())
        .requestMatchers("/static/**");
  }

//  스프링 시큐리티 세부 설정
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
//        JWT 기반 인증이기 때문에 csrf 사용 중지
        .csrf(csrf -> csrf.disable())
//        JWT 기반 인증이기 때문에 cors가 필요없지만 현재와 같은 형태로 동작 시 웹 브라우저에서는 cors 규칙 위반이라고 출력되기 때문에 cors 설정이 필요함
//        스프링 빈으로 등록한 cors 설정을 스프링 시큐리티에 적용
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
//        JWT 기반 인증이기 때문에 기본 form 사용 중지
        .httpBasic(httpBasic -> httpBasic.disable())
//        JWT 기반 인증이기 때문에 기본 로그아웃 사용 중지
        .logout(logout -> logout.disable())
//        JWT 기반 인증이기 때문에 세션 사용 중지
        .sessionManagement(sessionManagementConfigurer -> sessionManagementConfigurer
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//        회원 가입, login을 위한 /auth/** url과 게시물 목록을 위한 /board url은 인증없이 사용 가능
        .authorizeHttpRequests(authorizeRequests -> authorizeRequests
                .requestMatchers("/auth/**", "/board").permitAll()
//            관리자 페이지는 관리자 권한이 필요함
                .requestMatchers("/admin/**").hasRole("ADMIN")
//            사용자 페이지와 /board/** url은 ROLE_MEMBER 권한이 필요함
                .requestMatchers("/member/**", "/board/**").hasAnyRole("ADMIN", "MEMBER")
                .requestMatchers("/api/auth/login","/api/auth/signup").permitAll()
//            나머지 url은 모두 인증 받은 사용자만 사용 가능
                .anyRequest().authenticated())
//        JWT 기반 인증이기 때문에 사용자가 만든 JWT 인증 필터를 사용하도록 등록
//        addFilterBefore() : 첫번째 매개변수로 지정한 필터를 두번째 매개변수로 지정한 스프링 시큐리티 필터보다 먼저 동작
//        addFilterAfter() : 첫번째 매개변수로 지정한 필터를 두번째 매개변수로 지정한 스프링 시큐리티 필터 다음에 동작
//        UsernamePasswordAuthenticationFilter : 스프링 시큐티리의 일반적인 사용자 인증 필터(id/pw 기반 인증)
        .addFilterBefore(jwtTokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
        .build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}












