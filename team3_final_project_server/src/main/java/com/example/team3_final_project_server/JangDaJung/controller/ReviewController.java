package com.example.team3_final_project_server.JangDaJung.controller;

import com.example.team3_final_project_server.JangDaJung.JDJService;
import com.example.team3_final_project_server.configuration.jwt.JwtTokenProvider;
import com.example.team3_final_project_server.dto.ReviewDTO;
import com.example.team3_final_project_server.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/pre/review")
@RequiredArgsConstructor
@CrossOrigin(origins ="http://localhost:5173")
public class ReviewController {
    @Autowired
    private JDJService jdjService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @GetMapping("/resIdxByUser")
    public ResponseEntity<?> getResIdxByUser(@RequestHeader("Authorization") String authorizationHeader) {
        // Authorization 헤더에서 토큰 추출
        String token = authorizationHeader.replace("Bearer ", "");

        // 토큰에서 인증 정보 얻기
        Authentication authentication = jwtTokenProvider.getAuthentication(token);

        // UserDTO 객체에서 userIdx 추출
        UserDTO userDTO = (UserDTO) authentication.getPrincipal();
        int userIdx = userDTO.getUserIdx();  // 여기서 userIdx를 추출

        // userIdx를 통해 예약 정보를 조회
        Optional<Integer> resIdx = jdjService.findResIdxByUserIdx(userIdx);

        if (resIdx.isPresent()) {
            return ResponseEntity.ok().body(resIdx.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("등록된 레스토랑이 없습니다.");
        }
    }

//    메인 페이지에서 리뷰 통계
    @GetMapping("/main")
    public ResponseEntity<?> getReviewChByResIdx(@RequestParam int resIdx) {
        Map<String, Object> summary = jdjService.getReviewChByResIdx(resIdx);
        return ResponseEntity.ok(summary);
    }

//    리뷰 페이지
    @GetMapping("/list")
    public List<ReviewDTO> getReviews(@RequestParam int resIdx) {
        return jdjService.getReviewListByResIdx(resIdx);
    }

//    @PostMapping("reply")
//    public ResponseEntity<?> updatePreReply(@RequestBody ReviewDTO reviewDTO) {
//        int result = jdjService.updatePreReply(reviewDTO);
//        if (result > 0) {
//            return ResponseEntity.ok("답글 등록 완료");
//        }
//        else {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("등록 실패");
//        }
//    }

}
