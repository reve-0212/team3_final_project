package com.example.team3_final_project_server.JangDaJung;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JDJServiceImpl implements JDJService {
  @Autowired
  private JDJMapper jdjMapper;
}
