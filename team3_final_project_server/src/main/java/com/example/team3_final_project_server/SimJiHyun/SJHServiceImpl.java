package com.example.team3_final_project_server.SimJiHyun;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SJHServiceImpl implements SJHService {
  @Autowired
  private SJHMapper sjhMapper;
}
