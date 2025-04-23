package com.example.team3_final_project_server.controller;

import com.example.team3_final_project_server.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {
  @Autowired
  private TestService testService;

  /*테스트용 컨트롤러입니다
   * 추후 개발하면서 추가적으로 컨트롤러가 더 필요할 시 <이름>Controller 로 하거나
   * 기능별로 분류해 <기능명>컨트롤러 로 다른 컨트롤러를 제작해주시길 바랍니다*/

  @GetMapping("/test")
  public String test() {
    return "test1234";
  }
}
