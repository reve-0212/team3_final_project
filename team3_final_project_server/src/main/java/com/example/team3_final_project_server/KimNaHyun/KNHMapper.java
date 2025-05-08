package com.example.team3_final_project_server.KimNaHyun;

import com.example.team3_final_project_server.dto.MenuDTO;
import com.example.team3_final_project_server.dto.ReservationDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface KNHMapper {
    void insertReservation(ReservationDTO dto);

    void updateRsvDateTime(ReservationDTO dto);

    List<MenuDTO> getAllMenus();
}
