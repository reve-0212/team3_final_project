package com.example.team3_final_project_server.SimJiHyun.mapper;

import com.example.team3_final_project_server.dto.ReservationDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface OwnerSjhMapper {
  List<ReservationDTO> getPastDateRes(int userIdx);
}
