package com.example.team3_final_project_server.JeonSeongYun;

import com.example.team3_final_project_server.dto.ResponseDTO;
import com.example.team3_final_project_server.dto.RestaurantListDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jsy")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class JSYController {

  @Autowired
  private JSYService jsyService;


  @GetMapping("/contents/{category}")
  public List<RestaurantListDTO> getRstListByCategory(@PathVariable("category") String category) throws Exception {
    System.out.println(" /contents/{category} 받아온 값 : " + category);
    return jsyService.getRstListByCategory(category);
  }

  @GetMapping("/ownerLogin")
  public ResponseEntity<?> getOwnerLoginCheck(@RequestParam String ownerId, @RequestParam String ownerPw) {
    try {
      ResponseDTO jwtToken = jsyService.getJwtOwnerLoginCheck(ownerId, ownerPw);
      System.out.println("OwnerLogin");
      return ResponseEntity.ok().body(jwtToken);
    } catch (AuthenticationException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패");
    }
  }

  @GetMapping("/test")
  public void test() {
    System.out.println(" /test");
  }


  @GetMapping("/owner/login")
  public ResponseEntity<?> getOwnerLoginCheck(@RequestParam String ownerId, @RequestParam String ownerPw) {
    try {
      ResponseDTO jwtToken = jsyService.getJwtOwnerLoginCheck(ownerId, ownerPw);
      System.out.println("OwnerLogin");
      return ResponseEntity.ok().body(jwtToken);
    } catch (AuthenticationException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패");
    }
  }

  @GetMapping("/test")
  public void test() {
    System.out.println(" /test");
  }


  @GetMapping("/owner/login")
  public ResponseEntity<?> getOwnerLoginCheck(@RequestParam String userId, @RequestParam String userPw) {
    try {
      ResponseDTO jwtToken = jsyService.getJwtOwnerLoginCheck(userId, userPw);
      System.out.println("OwnerLogin");
      return ResponseEntity.ok().body(jwtToken);
    } catch (AuthenticationException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패");
    }
  }
}