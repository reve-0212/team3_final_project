package com.example.team3_final_project_server.JunKangSan;
//JKSController.java

import com.example.team3_final_project_server.dto.*;
import com.example.team3_final_project_server.dto.RestaurantDTO;
import com.example.team3_final_project_server.dto.ReviewDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@Controller
public class JKSController {

    @Autowired
    private JKSService jksService;


//  http://localhost:5173/resdetail/1 과 같은 형식으로 접속


    // 식당 단일 상세보기
    @GetMapping("/resdetail/{resIdx}")
    @ResponseBody
    public RestaurantDTO getRestaurantByResIdx(@PathVariable int resIdx) {
        return jksService.getRestaurantsByResIdx(resIdx); // 단일 DTO 응답
    }

    //  대표메뉴 - 05-12
    @GetMapping("/bestmenu/{resIdx}")
    @ResponseBody
    public List<MenuDTO> getBestMenu(@PathVariable int resIdx) {
        return jksService.getBestMenu(resIdx);
    }

    //  리뷰
    @GetMapping("/reviews/{resIdx}")
    @ResponseBody
    public List<ReviewDTO> getReviews(@RequestParam int resIdx) {
        return jksService.getReviewsByResIdx(resIdx);
    }


    //  리뷰 평균
    @GetMapping("/reviews/average/{resIdx}")
    @ResponseBody
    public Double getAvgRating(@PathVariable int resIdx) {
        return jksService.getAvgRatingByResIdx(resIdx);
    }

    //  종류별 리뷰 평균(음식, 가격, 서비스, 청결)
    @GetMapping("/reviews/average/type/{resIdx}")
    @ResponseBody
    public Map<String, Double> getAvgByType(@PathVariable int resIdx) {
        return jksService.getAvgRatingByType(resIdx);
    }


    // 가게 리스트
    @GetMapping("/contents/{category}")
    @ResponseBody
    public List<RestaurantListDTO> getRstListByCategory(@PathVariable("category") String category) throws Exception {
        return jksService.getRstListByCategory(category);
    }

    // 가게 상세정보 + 해시태그
    @GetMapping("/detail/{pathIdx}")
    @ResponseBody
    public RestaurantDTO getRstListByPath(@PathVariable("pathIdx") int pathIdx) throws Exception {
        return jksService.getRstListByPath(pathIdx);
    }

}
