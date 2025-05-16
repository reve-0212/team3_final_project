package com.example.team3_final_project_server.KimNaHyun;


import com.example.team3_final_project_server.dto.MenuDTO;
import com.example.team3_final_project_server.dto.ReservationDTO;
import com.example.team3_final_project_server.dto.ReviewDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController

@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")

public class KNHController {
  @Autowired
  private KNHService knhService;




  // 예약 페이지
  @PutMapping("/date")
  public void updateRsvDate(@RequestBody ReservationDTO reservationDTO) throws Exception {
    System.out.println("/visitors/{userIdx}/{resIdx} 받아온 값 : " + reservationDTO.getRsvPeople());
    knhService.updateRsvDate(
            reservationDTO.getUserIdx(),
            reservationDTO.getResIdx(),
            reservationDTO.getRsvPeople(),
            reservationDTO.getRsvMan(),
            reservationDTO.getRsvWoman(),
            reservationDTO.getRsvBaby(),
            reservationDTO.getRsvDate(),
            reservationDTO.getRsvTime()
    );
  }



  // 메뉴
  @GetMapping("/menu/{resIdx}")
  public List<MenuDTO> getAllMenus(@PathVariable("resIdx") int resIdx) {
    List<MenuDTO> menus = knhService.getAllMenus(resIdx);
    return menus;
  }

  // 메뉴 업데이트
  @PostMapping("/menu/{userIdx}/{resIdx}")
  public void updateRsvMenu(
          @PathVariable("userIdx") int userIdx,
          @PathVariable("resIdx") int resIdx,
          @RequestBody ReservationDTO reservationDTO)
          throws Exception {
    System.out.println("userIdx : " + userIdx);
    System.out.println("resIdx : " + resIdx);
    knhService.updateRsvMenu(userIdx, resIdx);
  }

  // 아이디,날짜 데이터로 예약번호 조회
  @GetMapping("/menu/find")
  public Integer getResIdx(
          @RequestParam("userIdx") int userIdx,
          @RequestParam("resIdx") int resIdx,
          @RequestParam("rsvDate") String rsvDate,
          @RequestParam("rsvTime") String rsvTime
  ) {
    List<ReservationDTO> reservations = knhService.getResIdx(userIdx, resIdx, rsvDate, rsvTime);

    if (reservations != null && !reservations.isEmpty()) {
      Integer reservationIdx = reservations.get(0).getReservationIdx();

      return reservationIdx;
    } else {

      return null;
    }
  }


    @GetMapping("/time/{resIdx}")
    public ResponseEntity<String> getResReserveTime(@PathVariable int resIdx) {
        String resReserveTime = knhService.getResReserveTime(resIdx);

        if (resReserveTime != null) {
            return ResponseEntity.ok(resReserveTime);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/review")
    public Map<String, Object> submitReview(@RequestBody ReviewDTO reviewDTO) {
        Map<String, Object> response = new HashMap<>();
        try {
            knhService.submitReview(reviewDTO);
            int reviewIdx = reviewDTO.getReviewIdx(); // 등록된 리뷰 ID
            response.put("success", true);
            response.put("reviewIdx", reviewIdx); // 클라이언트에서 활용 가능
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "리뷰 등록 실패: " + e.getMessage());
        }
        return response;
    }

    //  게시판 목록 가져오기
    @GetMapping("/review/{userIdx}")
    public List<ReviewDTO> getReviews(@PathVariable("userIdx") int userIdx) throws Exception {
        return knhService.getReviews(userIdx);
    }


    @GetMapping("/review/detail/{reviewIdx}")
    public ReviewDTO getReviewDetail(@PathVariable("reviewIdx") int reviewIdx) throws Exception {
        return knhService.getReviewDetail(reviewIdx);
    }

    @PutMapping("/review/{reviewIdx}")
    public ResponseEntity<?> updateReview(@PathVariable int reviewIdx, @RequestBody ReviewDTO reviewDTO) {
        try {
            reviewDTO.setReviewIdx(reviewIdx);
            knhService.updateReview(reviewDTO);
            return ResponseEntity.ok().body("리뷰가 수정되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("수정 실패: " + e.getMessage());
        }
    }

    @DeleteMapping("/review/{reviewIdx}")
    public ResponseEntity<?> deleteReview(@PathVariable int reviewIdx) {
        try {
            knhService.deleteReview(reviewIdx);
            return ResponseEntity.ok().body("리뷰가 삭제되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("삭제 실패: " + e.getMessage());
        }
    }
}












