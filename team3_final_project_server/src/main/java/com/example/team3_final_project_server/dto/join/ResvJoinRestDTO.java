package com.example.team3_final_project_server.dto.join;

import com.example.team3_final_project_server.dto.ReservationDTO;
import com.example.team3_final_project_server.dto.RestaurantDTO;
import lombok.Data;

@Data
public class ResvJoinRestDTO {
  private ReservationDTO reservation;
  private RestaurantDTO restaurant;
}
