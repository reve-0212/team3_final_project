package com.example.team3_final_project_server.KimSangMin.controller;

import com.example.team3_final_project_server.KimSangMin.service.OwnerService;
import com.example.team3_final_project_server.KimSangMin.response.PreResponse;
import com.example.team3_final_project_server.dto.OwnerDTO;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class OwnerController {

    @Autowired
    private OwnerService ownerService;

    //  사장님 회원가입
    @PostMapping("/admin/owner")
    public ResponseEntity<PreResponse> singOwner(@RequestBody OwnerDTO ownerDTO) {
        boolean success = ownerService.signOwner(ownerDTO);

        if (success) {
            PreResponse response = new PreResponse(success, "회원가입 성공", ownerDTO);
            return ResponseEntity.ok(response);
        } else {
            PreResponse response = new PreResponse(false, "회원가입 실패", null);
            return ResponseEntity.badRequest().body(response);
        }
    }

    //  사장님 로그인
    @PostMapping("/owner/login")
    public ResponseEntity<PreResponse> login(@RequestBody OwnerDTO ownerDTO, HttpSession session) {
        OwnerDTO owner = ownerService.loginOwner(ownerDTO);

        if (owner != null) {
            session.setAttribute("owner", owner);
            System.out.println("세션에 owner 저장됨: " + session.getAttribute("owner"));
            PreResponse response = new PreResponse(true, "로그인 성공", owner);
            return ResponseEntity.ok(response);
        } else {
            PreResponse response = new PreResponse(false, "로그인 실패", null);
            return ResponseEntity.badRequest().body(response);
        }
    }
//    사장님 로그아웃
    @PostMapping("/owner/logout")
    public ResponseEntity<PreResponse> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok(new PreResponse(true, "로그아웃 성공", null));
    }



    //  사장님 정보 받아오기
    @GetMapping("/owner/info")
    public ResponseEntity<PreResponse> ownerInfo(HttpSession session) {
        OwnerDTO ownerDTO = (OwnerDTO) session.getAttribute("owner");

        session.setAttribute("owner", ownerDTO); // 세션에 ownerDTO를 저장
        System.out.println("Owner saved in session: " + ownerDTO);

        if (ownerDTO != null) {
            boolean success = ownerService.ownerInfo(ownerDTO);
            PreResponse response = new PreResponse(success, "조회성공", ownerDTO);
            return ResponseEntity.ok(response);
        } else {
            PreResponse response = new PreResponse(false, "조회실패", null);
            return ResponseEntity.badRequest().body(response);
        }
    }

    //  사장님 정보 수정하기
    @PutMapping("/owner/update")
    public ResponseEntity<PreResponse> updateOwner(@RequestBody OwnerDTO ownerDTO, HttpSession session) {
        OwnerDTO sessionOwner = (OwnerDTO) session.getAttribute("owner");

        if (sessionOwner != null && sessionOwner.getOwnerId().equals(ownerDTO.getOwnerId())) {
            boolean success = ownerService.updateOwner(ownerDTO);
            if (success) {
                session.setAttribute("owner", ownerDTO);

                PreResponse response = new PreResponse(success, "정보 수정 성공", ownerDTO);
                return ResponseEntity.ok(response);
            } else {
                PreResponse response = new PreResponse(false, "정보 수정 실패", null);
                return ResponseEntity.badRequest().body(response);
            }
        } else {
            PreResponse response = new PreResponse(false, "정보 불일치", null);
            return ResponseEntity.badRequest().body(response);
        }
    }


}

