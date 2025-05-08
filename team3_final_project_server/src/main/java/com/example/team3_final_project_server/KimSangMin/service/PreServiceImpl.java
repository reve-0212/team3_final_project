package com.example.team3_final_project_server.KimSangMin.service;

import com.example.team3_final_project_server.KimSangMin.mapper.PreMapper;
import com.example.team3_final_project_server.dto.SeatDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PreServiceImpl implements PreService {

    @Autowired
    private PreMapper preMapper;

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
}