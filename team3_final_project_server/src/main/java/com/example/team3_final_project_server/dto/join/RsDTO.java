package com.example.team3_final_project_server.dto.join;

import com.example.team3_final_project_server.dto.ReservationDTO;
import com.example.team3_final_project_server.dto.SelectedSeatDTO;
import lombok.Data;

@Data
public class RsDTO {
  private ReservationDTO reservationDTO;
  private SelectedSeatDTO selectedSeatDTO;
}
