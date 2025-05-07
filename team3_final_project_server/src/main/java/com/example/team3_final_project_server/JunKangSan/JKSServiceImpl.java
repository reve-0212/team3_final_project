package com.example.team3_final_project_server.JunKangSan;

import com.example.team3_final_project_server.dto.RestaurantDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JKSServiceImpl implements JKSService {

  @Autowired
  private JKSMapper jksMapper;

  @Override
  public List<RestaurantDTO> getAllRestaurants() {

    System.out.println("DTO테스트1");
    System.out.println(jksMapper.getAllRestaurants());
    return jksMapper.getAllRestaurants();


  }
}
