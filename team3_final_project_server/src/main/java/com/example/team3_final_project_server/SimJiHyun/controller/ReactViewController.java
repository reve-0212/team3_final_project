package com.example.team3_final_project_server.SimJiHyun.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ReactViewController {
  // /api, /static, /css, /js 등 제외하고 모든 경로는 index.html로 포워딩
  @RequestMapping(value = {
          "/", "/user/**", "/book/**", "/pre/**", "/resdetail/**", "/contentList/**"
  })
  public String forward() {
    return "forward:/index.html";
  }
}
