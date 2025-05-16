package com.example.team3_final_project_server.KimSangMin.service;

import com.example.team3_final_project_server.KimSangMin.response.TimeRequest;
import com.example.team3_final_project_server.dto.*;

import java.util.List;

public interface PreService {

  // 가게 정보 저장
  boolean reSave(RestaurantDTO restaurant);

  //  가게 정보 수정하기
  boolean updateRest(int resIdx, RestaurantDTO storeData);

  //    가게 정보 불러오기
  RestaurantDTO getRest(int userIdx);

//  //    가게 운영시간 기입하기
//  boolean insertTime(List<TimeDTO> timeList);

  //    좌석 저장
  boolean saveSeats(List<SeatDTO> seats);

  // userIdx로 resIdx 찾기
  Integer findResIdx(int userIdx);

  // 좌석 불러오기
  List<SeatDTO> loadSeat(int userIdx);


  ResponseDTO tokenCheck(String token);

  //    userId로 가게찾기
  RestaurantDTO getRestByUserIdx(int userIdx);

// 좌석배치도 수정하기
  boolean updateSeats(SeatDTO seat);

//  좌석 삭제하기
  boolean deleteSeate(Integer seatId, Integer resIdx);

//  가게 카테고리 저장
  boolean cateSave(CategoryDTO category);

//  가게 카테고리 불러오기
    CategoryDTO getResIdxByCate(Integer resIdx);

//    가게 시간 저장하기
  boolean setTime(Integer resIdx, List<TimeDTO> times);
// 가게 시간 수정하기
  boolean updateTime(Integer resIdx, List<TimeDTO> times);

  List<TimeDTO> getTimeByResIdx(Integer resIdx);

//  가게에 저장된 카테고리가 있는지 확인하기
  boolean existsCate(Integer resIdx);

//  가게에 저장된 카테고리 수정하기
  boolean updateCate(CategoryDTO category);

//  db에 저장된 편의시설 가져오기.
  List<ConvenientDTO> getFunc();

  void saveFunc(Integer resIdx, List<Integer> cvIds);
  
  int haveFunc(Integer resIdx);

  void updateFunc(Integer resIdx, List<Integer> cvIds);

  List<ConvenientDTO> getSaveFunc(Integer resIdx);
}