package com.example.team3_final_project_server.KimSangMin.service;

import com.example.team3_final_project_server.KimSangMin.mapper.PreMapper;
import com.example.team3_final_project_server.dto.RestaurantDTO;
import com.example.team3_final_project_server.dto.SeatDTO;
import com.example.team3_final_project_server.dto.TimeDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.util.List;

@Service
public class PreServiceImpl implements PreService {

    @Autowired
    private PreMapper preMapper;

    //    좌석 정보 저장
    @Override
    public boolean saveSeats(List<SeatDTO> seats) {
        try{
            preMapper.saveSeats(seats);
            return true;
        } catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

//    좌석 불러오기
    @Override
    public List<SeatDTO> loadSeat(String resIdx) {
        try {
            List<SeatDTO> seats = preMapper.loadSeat(resIdx);
            System.out.println("Loaded seats: " + seats);  // 로그 출력
            return seats;
        } catch (Exception e) {
            return null;
        }
    }

    //    가게 정보 저장
    @Override
    public boolean reSave(RestaurantDTO restaurant) {
        int result = preMapper.reSave(restaurant);
        return result > 0;
    }


// 가게 정보 수정하기
    @Override
    public boolean updateRest(int resIdx, RestaurantDTO rest) {
        int result = preMapper.updateRest(resIdx,rest);
        return result > 0;
    }

//    가게 운영시간 저장
    @Override
    public boolean insertTime(List<TimeDTO> timeList) {
        try {
            for (TimeDTO time : timeList) {
                preMapper.insertTime(time);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

//    가게 정보 조회
    @Override
    public RestaurantDTO getRest(int resIdx) {
        return preMapper.getRest(resIdx);
    }
}