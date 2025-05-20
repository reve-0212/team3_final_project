package com.example.team3_final_project_server.JangDaJung.controller;

import com.example.team3_final_project_server.JangDaJung.JDJService;
import com.example.team3_final_project_server.configuration.jwt.JwtTokenProvider;
import com.example.team3_final_project_server.dto.MenuDTO;
import com.example.team3_final_project_server.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/menu")
@RequiredArgsConstructor
@CrossOrigin(origins ="http://localhost:5173")
public class MenuController {

    @Autowired
    private JDJService jdjService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @GetMapping("/resIdxByUser")
    public ResponseEntity<?> getResIdxByUser(@RequestHeader("Authorization") String authorizationHeader) {
        System.out.println("getResIdxByUser() called!");
        // Authorization 헤더에서 토큰 추출
        String token = authorizationHeader.replace("Bearer ", "");
        System.out.println("Token: " + token);

        // 토큰에서 인증 정보 얻기
        Authentication authentication = jwtTokenProvider.getAuthentication(token);

        // UserDTO 객체에서 userIdx 추출
        UserDTO userDTO = (UserDTO) authentication.getPrincipal();
        int userIdx = userDTO.getUserIdx();  // 여기서 userIdx를 추출

        // userIdx를 통해 예약 정보를 조회
        Optional<Integer> resIdx = jdjService.findResIdxByUserIdx(userIdx);


        System.out.println("User info from token: " + userDTO.toString());

        if (resIdx.isPresent()) {
            return ResponseEntity.ok().body(resIdx.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("등록된 레스토랑이 없습니다.");
        }
    }
//    리스트 불러오기
    @GetMapping("/list")
    public ResponseEntity<List<MenuDTO>> getMenuList(@RequestParam int resIdx) {
        List<MenuDTO> menuList = jdjService.getMenuList(resIdx);
        return ResponseEntity.ok(menuList);
    }

//    리스트 페이지에서 숨기기 해제
    @PutMapping("/unHidden/{menuIdx}")
    public ResponseEntity<Void> unhiddenMenu(@PathVariable int menuIdx, @RequestHeader("Authorization") String authorizationHeader) {
        System.out.println("컨트롤러에서 보낸 헤더 : " + authorizationHeader);
        jdjService.updateUnhidden(menuIdx, false);
        return ResponseEntity.ok().build();
    }

//    리스트 페이지에서 품절 해제
    @PutMapping("/unSoldOut/{menuIdx}")
    public ResponseEntity<Void> unsoldoutMenu(@PathVariable int menuIdx, @RequestHeader("Authorization") String authorizationHeader) {
        System.out.println("컨트롤러에서 보낸 헤더 : " + authorizationHeader);
        jdjService.updateUnSoldOut(menuIdx, false);
        return ResponseEntity.ok().build();
    }

    //    새 메뉴 등록하기
    @PostMapping("/newMenu")
    public ResponseEntity<Void> newMenu(@RequestBody MenuDTO menuDTO) {
        System.out.println("Received MenuDTO: " + menuDTO.toString());
        try {
            // menuImage는 클라이언트가 보낸 URL 그대로 사용
            int maxMenuSort = jdjService.selectMaxMenuSort(menuDTO.getResIdx());
            menuDTO.setMenuSort(maxMenuSort + 1);

            jdjService.newMenu(menuDTO);
            return ResponseEntity.ok().build();
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //    menuEdit 페이지에서 기본 정보 불러오기
    @GetMapping("/{menuIdx}")
    public ResponseEntity<MenuDTO> getMenuById(@PathVariable int menuIdx) {
        MenuDTO menuDTO = jdjService.getMenuById(menuIdx);
        return ResponseEntity.ok(menuDTO);
    }

//    메뉴 정보 수정 페이지
    @PutMapping("/edit/{menuIdx}")
    public ResponseEntity<?> editMenu(
        @PathVariable int menuIdx,
        @RequestParam("menuName") String menuName,
        @RequestParam("menuPrice") int menuPrice,
        @RequestParam("menuExplanation") String menuExplanation,
        @RequestParam("menuImage") String menuImage
        ) {
        System.out.println("Received menuIdx: " + menuIdx);
        // menuIdx가 0일 경우, 오류를 반환하도록 처리
        if (menuIdx == 0) {
            return ResponseEntity.badRequest().body("Invalid menuIdx");
        }

        try {
            jdjService.editMenu(menuIdx, menuName, menuPrice, menuExplanation, menuImage);
            return ResponseEntity.ok("수정 성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("수정 실패: " + e.getMessage());
        }
    }

//    메뉴 리스트 수정 페이지
    @Transactional
    @PostMapping("/listEdit")
    public ResponseEntity<?> updateMenuList(@RequestBody List<MenuDTO> menus) {
        try {
            for (MenuDTO menuDTO : menus) {
                jdjService.updateMenuList(menuDTO);
            }
            System.out.println("Updating menu list: " + menus);
            return ResponseEntity.ok().build();
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("저장 실패");
        }
    }

//    메뉴 삭제
    @DeleteMapping("/delete/{menuIdx}")
    public ResponseEntity<String> deleteMenu(@PathVariable int menuIdx) {
        try {
            jdjService.deleteMenu(menuIdx);
            return ResponseEntity.ok("메뉴가 삭제되었습니다.");
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("메뉴 삭제 실패: " + e.getMessage());
        }
    }
}
