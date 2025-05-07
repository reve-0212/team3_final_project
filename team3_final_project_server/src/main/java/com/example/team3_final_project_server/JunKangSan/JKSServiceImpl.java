package com.example.team3_final_project_server.JunKangSan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JKSServiceImpl implements JKSService {
  @Autowired
  private JKSMapper jksMapper;
}
