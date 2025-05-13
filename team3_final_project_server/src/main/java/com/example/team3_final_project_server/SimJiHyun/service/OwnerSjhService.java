package com.example.team3_final_project_server.SimJiHyun.service;

import com.example.team3_final_project_server.SimJiHyun.mapper.OwnerSjhMapper;
import com.example.team3_final_project_server.dto.ReservationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OwnerSjhService {
  @Autowired
  private OwnerSjhMapper ownerSjhMapper;

  public List<ReservationDTO> getPastDateRes(int userIdx) {
    return ownerSjhMapper.getPastDateRes(userIdx);
  }
}
