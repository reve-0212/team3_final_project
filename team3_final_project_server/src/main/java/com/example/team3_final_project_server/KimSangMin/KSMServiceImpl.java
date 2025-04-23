package com.example.team3_final_project_server.KimSangMin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KSMServiceImpl implements KSMService {
  @Autowired
  private KSMMapper ksmMapper;
}
