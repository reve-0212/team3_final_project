package com.example.team3_final_project_server.JeonSeongYun;

import com.example.team3_final_project_server.dto.RestaurantListDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jsy")
@CrossOrigin(origins = "http://localhost:5173")
public class JSYController {

  @Autowired
  private JSYService jsyService;


  @GetMapping("/contents/{category}")
  public List<RestaurantListDTO> getRstListByCategory(@PathVariable("category") String category) throws Exception {
    System.out.println(" /contents/{category} 받아온 값 : " + category);
    return jsyService.getRstListByCategory(category);
  }

}
