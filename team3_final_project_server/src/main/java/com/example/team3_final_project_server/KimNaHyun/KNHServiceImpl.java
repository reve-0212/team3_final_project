package com.example.team3_final_project_server.KimNaHyun;

import com.example.team3_final_project_server.dto.ReservationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KNHServiceImpl implements KNHService {

  @Autowired
  private final KNHMapper knhMapper;

  @Autowired
  public KNHServiceImpl(KNHMapper knhMapper) {
    this.knhMapper = knhMapper;
  }

  @Override
  public void saveReservation(ReservationDTO dto) {
    knhMapper.insertReservation(dto);
  }

  @Override
  public void saveDateTime(ReservationDTO dto) {
    knhMapper.insertReservation(dto);
  }
}
