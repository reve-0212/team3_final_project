package com.example.team3_final_project_server.KimNaHyun;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KNHServiceImpl implements KNHService {
  @Autowired
  private KNHMapper knhMapper;
}
