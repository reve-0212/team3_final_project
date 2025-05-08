package com.example.team3_final_project_server.KimNaHyun;

import com.example.team3_final_project_server.dto.MenuDTO;
import com.example.team3_final_project_server.dto.ReservationDTO;
import org.springframework.stereotype.Service;

import java.util.List;

public interface KNHService {
    void saveReservation(ReservationDTO dto);
    void saveDateTime(ReservationDTO dto);

    List<MenuDTO> getAllMenus();
}
