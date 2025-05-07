package com.example.team3_final_project_server.JeonSeongYun;

import com.example.team3_final_project_server.dto.RestaurantListDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JSYServiceImpl implements JSYService {
  @Autowired
  private JSYMapper jsyMapper;

  @Override
  public List<RestaurantListDTO> getRstListByCategory(String category) throws Exception {
    return jsyMapper.getRstListByCategory(category);
  }
}
