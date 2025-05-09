package com.example.team3_final_project_server.dto.join;

import com.example.team3_final_project_server.dto.MenuDTO;
import com.example.team3_final_project_server.dto.ReservationDTO;
import com.example.team3_final_project_server.dto.RestaurantDTO;
import lombok.Data;

@Data
public class ResvRestMenuJoinDTO {
  private ReservationDTO reservation;
  private RestaurantDTO restaurant;
  private MenuDTO menu;
}
