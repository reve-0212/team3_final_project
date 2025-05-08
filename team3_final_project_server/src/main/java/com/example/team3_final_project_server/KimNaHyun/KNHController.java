package com.example.team3_final_project_server.KimNaHyun;


import com.example.team3_final_project_server.dto.ReservationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


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




 }


