//package com.example.team3_final_project_server.configuration.JwtUtil;
//
//import com.example.team3_final_project_server.configuration.jwt.JwtTokenProvider;
//import com.example.team3_final_project_server.dto.UserDTO;
//import org.springframework.security.core.Authentication;
//import org.springframework.stereotype.Component;
//
//@Component
//public class JwtUtil {
//
//    private final JwtTokenProvider jwtTokenProvider;
//
//    public JwtUtil(JwtTokenProvider jwtTokenProvider) {
//        this.jwtTokenProvider = jwtTokenProvider;
//    }
//
//    // JWT에서 userIdx를 추출하는 메서드
//    public int getUserIdx(String token) {
//        // getAuthentication을 통해 Authentication 객체를 가져오고, 그 안의 principal을 UserDTO로 캐스팅
//        Authentication authentication = jwtTokenProvider.getAuthentication(token);
//        UserDTO userDTO = (UserDTO) authentication.getPrincipal();  // UserDTO로 캐스팅
//        return userDTO.getUserIdx();  // UserDTO에서 userIdx 반환
//    }
//}
