package com.example.team3_final_project_server.KimNaHyun;

import com.example.team3_final_project_server.dto.MenuDTO;
import com.example.team3_final_project_server.dto.ReservationDTO;
import com.example.team3_final_project_server.dto.ReviewDTO;
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
  public void updateRsvDate(int userIdx, int resIdx, int rsvPeople, int rsvMan, int rsvWoman, int rsvBaby, String rsvDate, String rsvTime) throws Exception {
    knhMapper.updateRsvDate(userIdx, resIdx, rsvPeople, rsvMan, rsvWoman, rsvBaby, rsvDate, rsvTime);
  }

  @Override
  public void updateRsvMenu(int userIdx, int resIdx) throws Exception {
    knhMapper.updateRsvMenu(userIdx, resIdx);
  }

  @Override
  public List<ReservationDTO> getResIdx(int userIdx, int resIdx, String rsvDate, String rsvTime) {
    return knhMapper.getResIdx(userIdx, resIdx, rsvDate, rsvTime);
  }

  @Override
  public String getResReserveTime(int resIdx) {
    return knhMapper.selectResReserveTime(resIdx);
  }

  @Override
  public void submitReview(ReviewDTO reviewDTO) throws Exception {
    knhMapper.insertReview(reviewDTO);
  }

  @Override
  public List<ReviewDTO> getReviews(int userIdx) throws Exception {
    return knhMapper.getReviews(userIdx);
  }
}
