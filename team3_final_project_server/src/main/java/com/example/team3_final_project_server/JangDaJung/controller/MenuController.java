package com.example.team3_final_project_server.JangDaJung.controller;

import com.example.team3_final_project_server.JangDaJung.JDJService;
import com.example.team3_final_project_server.dto.MenuDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/menu")
@RequiredArgsConstructor
@CrossOrigin(origins ="http://localhost:5173")
public class MenuController {

    @Autowired
    private JDJService jdjService;

//    리스트 불러오기
    @GetMapping("/list")
    public ResponseEntity<List<MenuDTO>> getMenuList(@RequestParam int resIdx) {
        List<MenuDTO> menuList = jdjService.getMenuList(resIdx);
        return ResponseEntity.ok(menuList);
    }

//    리스트 페이지에서 숨기기 해제
    @PutMapping("/unHidden/{menuIdx}")
    public ResponseEntity<Void> unhiddenMenu(@PathVariable int menuIdx) {
        jdjService.updateUnhidden(menuIdx, false);
        return ResponseEntity.ok().build();
    }

//    리스트 페이지에서 품절 해제
    @PutMapping("/unSoldOut/{menuIdx}")
    public ResponseEntity<Void> unsoldoutMenu(@PathVariable int menuIdx) {
        jdjService.updateUnSoldOut(menuIdx, false);
        return ResponseEntity.ok().build();
    }

    //    새 메뉴 등록하기
    @PostMapping("/newMenu")
    public ResponseEntity<Void> newMenu(
        @ModelAttribute MenuDTO menuDTO,
        @RequestParam(value = "menuImage", required = false) MultipartFile menuImage) {
        System.out.println("Received MenuDTO: " + menuDTO.toString());
        try {
            String imagePath = null;
            if (menuImage != null && !menuImage.isEmpty()) {
                imagePath = saveImage(menuImage);
            }

            // 이미지 경로 세팅
            menuDTO.setMenuImage(imagePath);

            // 정렬 번호 자동 설정
            int maxMenuSort = jdjService.selectMaxMenuSort(menuDTO.getResIdx());
            menuDTO.setMenuSort(maxMenuSort + 1);

            jdjService.newMenu(menuDTO);
            return ResponseEntity.ok().build();

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
//    (
//        @RequestParam("resIdx") int resIdx,
//        @RequestParam("menuName") String menuName,
//        @RequestParam("menuPrice") int menuPrice,
//        @RequestParam("menuExplanation") String menuExplanation,
//        @RequestParam(value = "menuImage", required = false) MultipartFile menuImage,
//        @RequestParam("menuHidden") boolean menuHidden,
//        @RequestParam("menuSoldOut") boolean menuSoldOut,
//        @RequestParam("menuSort") int menuSort) {
//
//        try {
//            // 1. 메뉴 이미지 저장 (서버에 파일 저장 후 경로 반환)
//            String imagePath = null;
//            if (menuImage != null && !menuImage.isEmpty()) {
//                imagePath = saveImage(menuImage);  // 이미지 저장 함수
//            }
//            // 2. MenuDTO 객체 생성 후 값 설정
//            MenuDTO menu = new MenuDTO();
//            menu.setResIdx(resIdx);
//            menu.setMenuName(menuName);
//            menu.setMenuPrice(menuPrice);
//            menu.setMenuExplanation(menuExplanation);
//            menu.setMenuImage(imagePath); // 이미지 경로 추가
//            menu.setMenuHidden(menuHidden);
//            menu.setMenuSoldOut(menuSoldOut);
//            menu.setMenuSort(menuSort);
//
//            // 3. DB에 메뉴 등록 (메뉴 저장 로직)
//            jdjService.newMenu(menu);
//
//            return ResponseEntity.ok().build(); // 성공적으로 처리된 경우
//        }
//        catch (IOException e) {
//            // 파일 저장 오류 처리
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }

    // 이미지 저장 (서버에 저장 후 경로 반환)
    private String saveImage(MultipartFile menuImage) throws IOException {
        String uploadDir = "/path/to/save/images/"; // 서버에 이미지 저장할 경로
        String fileName = UUID.randomUUID().toString() + "_" + menuImage.getOriginalFilename(); // 파일 이름 생성
        Path filePath = Paths.get(uploadDir, fileName); // 저장 경로

        // 파일 저장
        Files.copy(menuImage.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // 저장된 이미지 파일 경로 반환
        return "/images/" + fileName;
    }

//    메뉴 리스트 수정 페이지
    @PutMapping("/listEdit")
    public ResponseEntity<?> updateMenuList(@RequestBody List<MenuDTO> menus) {
        jdjService.updateMenuList(menus);
        return ResponseEntity.ok().build();
    }
}
