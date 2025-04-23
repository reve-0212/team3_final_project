package com.example.team3_final_project_server.JeonSeongYun;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JSYServiceImpl implements JSYService {
  @Autowired
  private JSYMapper jsyMapper;
}
