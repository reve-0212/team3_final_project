package com.example.team3_final_project_server.KimNaHyun;


import com.example.team3_final_project_server.dto.MenuDTO;
import com.example.team3_final_project_server.dto.ReservationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController

@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")

public class KNHController {
 @Autowired
 private KNHService knhService;

 @PostMapping("/visitors")
 public void saveReservation(@RequestBody ReservationDTO dto) {

  System.out.println(dto);
  knhService.saveReservation(dto);

 }

 @PostMapping("/date")
 public void saveDateTime(@RequestBody ReservationDTO dto) {
  System.out.println(dto);
  knhService.saveDateTime(dto);
 }

 @GetMapping("/menus")
 public List<MenuDTO> getAllMenus() {
  System.out.println("메서드 호출됨: getAllMenus");  // 메서드 호출 여부 확인용
  List<MenuDTO> menus = knhService.getAllMenus();

  if (menus == null || menus.isEmpty()) {
   System.out.println("메뉴 데이터가 비어 있거나 null입니다.");
  } else {
   System.out.println("불러온 메뉴 리스트: " + menus);
  }

  return menus;
 }
}


