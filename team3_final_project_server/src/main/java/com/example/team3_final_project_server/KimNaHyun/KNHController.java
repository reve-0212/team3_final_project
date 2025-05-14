package com.example.team3_final_project_server.KimNaHyun;


import com.example.team3_final_project_server.dto.MenuDTO;
import com.example.team3_final_project_server.dto.ReservationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController

@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")

public class KNHController {
  @Autowired
  private KNHService knhService;


  // 방문자 페이지
//    @PostMapping("/visitors/{userIdx}/{resIdx}")
//    public void getRsvIdx(
//            @PathVariable("userIdx") int userIdx,
//            @PathVariable("resIdx") int resIdx,
//            @RequestBody ReservationDTO reservationDTO)
//            throws Exception {
//  System.out.println("/visitors/{userIdx}/{resIdx} 받아온 값 : " + resIdx);
//        System.out.println("userIdx : " + userIdx);
//        System.out.println("resIdx : " + resIdx);
//        System.out.println("rsvMan : " + reservationDTO.getRsvMan());
//        System.out.println("rsvWoman : " + reservationDTO.getRsvWoman());
//        System.out.println("rsvBaby : " + reservationDTO.getRsvBaby());
//        System.out.println("rsvPeople : " + reservationDTO.getRsvPeople());
//        knhService.getRsvIdx(userIdx, resIdx, reservationDTO.getRsvMan(), reservationDTO.getRsvWoman(), reservationDTO.getRsvBaby(), reservationDTO.getRsvPeople());
//    }


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

//    @PostMapping("/visitors/date")
//    public void saveDateTime(@RequestBody ReservationDTO dto) {
//        System.out.println(dto);
//        knhService.saveDateTime(dto);
//    }

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
      System.out.println("✅ 반환된 reservationIdx = " + reservationIdx); // 콘솔 확인용
      return reservationIdx;
    } else {
      System.out.println("⚠️ 예약 정보가 없습니다.");
      return null;
    }
  }

}










