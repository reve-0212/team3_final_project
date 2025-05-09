package com.example.team3_final_project_server.KimSangMin.response;

import com.example.team3_final_project_server.dto.TimeDTO;
import lombok.Data;

import java.util.List;

@Data
public class TimeRequest {
    private int resIdx;
    private List<TimeDTO> timeList;
}
