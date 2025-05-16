package com.example.team3_final_project_server.KimSangMin.mapper;

import com.example.team3_final_project_server.KimSangMin.response.TimeRequest;
import com.example.team3_final_project_server.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PreMapper {

//    void saveSeats(List<SeatDTO> seats);



    int updateRest(int resIdx, RestaurantDTO storeData);

    RestaurantDTO getRest(int resIdx);

    List<SeatDTO> loadSeat(String resIdx);

    int reSave(RestaurantDTO restaurant);

    RestaurantDTO getRestByUserIdx(int userIdx);

    Integer findResIdx(int userIdx);

    int updateSeats(SeatDTO seat);

    int deleteSeat(Integer seatId, Integer resIdx);

    void saveSeat(SeatDTO seat);

    boolean checkSeatExists(SeatDTO seat);

    int cateSave(CategoryDTO category);

    Integer getResSeatNum(int resSeatId);

    CategoryDTO getResIdxByCate(Integer resIdx);

    int setTime(TimeDTO time);

    int updateTime(TimeDTO time);

    List<TimeDTO> getTimeByResIdx(Integer resIdx);

    boolean existsCate(Integer resIdx);

    int updateCate(CategoryDTO category);

    List<ConvenientDTO> getFunc();
}
