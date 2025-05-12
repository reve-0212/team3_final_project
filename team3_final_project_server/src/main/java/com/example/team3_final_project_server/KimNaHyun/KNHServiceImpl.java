package com.example.team3_final_project_server.KimNaHyun;

import com.example.team3_final_project_server.dto.MenuDTO;
import com.example.team3_final_project_server.dto.ReservationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KNHServiceImpl implements KNHService {

  @Autowired
  private final KNHMapper knhMapper;

  @Autowired
  public KNHServiceImpl(KNHMapper knhMapper) {
    this.knhMapper = knhMapper;
  }


  @Override
  public List<MenuDTO> getAllMenus(int resIdx) {
   return knhMapper.getAllMenus(resIdx);
  }


  @Override
  public void getRsvIdx(int userIdx, int resIdx, int rsvMan, int rsvWoman, int rsvBaby, int rsvPeople) throws Exception {
    knhMapper.getRsvIdx(userIdx, resIdx, rsvMan, rsvWoman, rsvBaby, rsvPeople);
  }

  @Override
  public void updateRsvDate(int userIdx, int resIdx, String rsvDate, String rsvTime) throws Exception {
    knhMapper.updateRsvDate(userIdx, resIdx, rsvDate, rsvTime);
  }

  @Override
  public void updateRsvMenu(int userIdx, int resIdx, int menuIdx, int rsvMenuCount) throws Exception {
    knhMapper.updateRsvMenu(userIdx, resIdx, menuIdx, rsvMenuCount);
  }

}
