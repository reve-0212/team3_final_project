package com.example.team3_final_project_server.SimJiHyun.controller;

import com.example.team3_final_project_server.SimJiHyun.service.OwnerSjhService;
import com.example.team3_final_project_server.dto.ReservationDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
@RestController
@RequiredArgsConstructor
public class OwnerSjhController {

  @Autowired
  private OwnerSjhService ownerSjhService;

  @GetMapping("/pre/pastDateRes")
  public List<ReservationDTO> getPastDateRes(@RequestParam("userIdx") int userIdx) {
    return ownerSjhService.getPastDateRes(userIdx);
  }
}
