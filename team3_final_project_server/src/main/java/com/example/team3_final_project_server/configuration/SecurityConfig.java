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
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.PUT;

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
  /*jwt 기반 인증이기 때문에 csrf, 기본 form, 기본 logout, session 사용 중지
   * 스프링 빈으로 등록한 cors 설정을 시큐리티에 적용한다
   * requestMatchers : 해당 권한을 가진 사람이 어느 사이트로 들어갈 수 있는지
   * permitAll : 전부 다 , hasAnyRole : 특정 권한 있는 사람만
   * 그 외 나머지 url 은 모두 인증받은 사용자만 사용 가능하다
   *
   *JWT 기반 인증이기 때문에 사용자가 만든 JWT 인증 필터를 사용하도록 등록
   * addFilterBefore() : 첫번째 매개변수로 지정한 필터를 두번째 매개변수로 지정한 스프링 시큐리티 필터보다 먼저 동작
   * addFilterAfter() : 첫번째 매개변수로 지정한 필터를 두번째 매개변수로 지정한 스프링 시큐리티 필터 다음에 동작
   * UsernamePasswordAuthenticationFilter : 스프링 시큐티리의 일반적인 사용자 인증 필터(id/pw 기반 인증)
   * */
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .httpBasic(httpBasic -> httpBasic.disable())
            .logout(logout -> logout.disable())
            .sessionManagement(sessionManagementConfigurer -> sessionManagementConfigurer
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(authorizeRequests -> authorizeRequests

                    //관리자 전용 페이지
                    .requestMatchers("/pre/admin/**").permitAll()

                    // 사장 전용
//                    .requestMatchers("/pre/**").hasRole("OWNER")
                    .requestMatchers("/pre/login").permitAll()  // 로그인은 모두 허용
                    .requestMatchers("/pre/resave").hasRole("OWNER") // 이건 인증된 사장만 가능

                    //로그인한 사용자용
                    .requestMatchers("/waiting/**", "/book/**", "/latestDetails", "/book/info").hasRole("USER")
                    .requestMatchers(GET, "/userReservation", "/getBook", "/pre/loadSeat/**").hasRole("USER")
                    .requestMatchers(PUT, "/cancelBook", "/reserveSeat").hasRole("USER")

//                    모든 사용자용
                    .requestMatchers("/user/**", "/latestDetails", "/bookmark", "/contentDetail", "/review", "/", "/api/visitors").permitAll()
                    .requestMatchers("/jsy/contents/**", "/jsy/ownerLogin", "/contents/**", "/detail/**", "/bestmenu/**", "/reservedSeat/**", "/isSeatAvailable/**","/getStoreLocation").permitAll()
                    .requestMatchers("/api/**", "/auth/**", "/api/auth/signup").permitAll()
                    .requestMatchers("/api/visitors", "/api/visitors/**").permitAll()
//            나머지 url은 모두 인증 받은 사용자만 사용 가능
                    .anyRequest().authenticated())

            .addFilterBefore(jwtTokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
            .build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}