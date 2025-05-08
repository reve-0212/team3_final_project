package com.example.team3_final_project_server.KimSangMin.service;

import com.example.team3_final_project_server.KimSangMin.mapper.PreMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PreServiceImpl implements PreService {

    @Autowired
    private PreMapper preMapper;

}
