package com.example.team3_final_project_server.KimNaHyun;

import com.example.team3_final_project_server.dto.ReservationDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface KNHMapper {
    void insertReservation(ReservationDTO dto);


}
