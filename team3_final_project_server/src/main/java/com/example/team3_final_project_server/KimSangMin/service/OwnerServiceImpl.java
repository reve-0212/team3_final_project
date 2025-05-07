package com.example.team3_final_project_server.KimSangMin.service;

import com.example.team3_final_project_server.KimSangMin.mapper.OwnerMapper;
import com.example.team3_final_project_server.dto.OwnerDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OwnerServiceImpl implements OwnerService {
  @Autowired
  private OwnerMapper ownerMapper;
// 관리자가 사장님 회원가입시키기
  @Override
  public boolean signOwner(OwnerDTO owner) {
    ownerMapper.saveOwner(owner);
    return true;
  }

// 사장님 로그인
  @Override
  public OwnerDTO loginOwner(OwnerDTO ownerDTO) {
    return ownerMapper.loginOwner(ownerDTO);
  }

//  사장님 정보 조회
  @Override
  public boolean ownerInfo(OwnerDTO ownerDTO) {
    OwnerDTO owner = ownerMapper.findOwnerId(ownerDTO);
    return owner != null;
  }
// 사장님 정보 수정
  @Override
  public boolean updateOwner(OwnerDTO ownerDTO) {
    int result = ownerMapper.updateOwner(ownerDTO);
    return result > 0;
  }
}
