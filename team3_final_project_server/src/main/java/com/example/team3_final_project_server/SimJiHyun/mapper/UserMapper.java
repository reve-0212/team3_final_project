package com.example.team3_final_project_server.SimJiHyun.mapper;

import com.example.team3_final_project_server.dto.RestaurantDTO;
import com.example.team3_final_project_server.dto.UserDTO;
import com.example.team3_final_project_server.dto.join.ResvJoinRestDTO;
import com.example.team3_final_project_server.dto.join.ResvRestMenuJoinDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface UserMapper {
  Optional<UserDTO> findByUserId(String userId);

  boolean existsByUserId(String userId);

  boolean existsByUserEmail(String userEmail);

  void saveUser(UserDTO user);

  void deleteByUserId(String userId);

  void updatePassword(String userId, String hashed);

  void updateField(String userId, String field, String value);

  List<ResvJoinRestDTO> userReservation(int userIdx);

  ResvRestMenuJoinDTO getBook(int reservationIdx, int restaurantIdx);

  void cancelBook(int reservationIdx);

  void save(UserDTO user);

  int searchResIdx(int userIdx, int resIdx, String rsvDate, String rsvTime);

  //  좌석 예약하기
  void reserveSeat(@Param("reservationIdx") int reservationIdx, @Param("seatId") int seatId);

  //  해당 가게에 시간에 좌석 예약되었는지 확인하기
  int isSeatAvailable(int shortPathIdx);

//  그 가게 총 좌석 갯수 확인하기
  int reservedSeat(int shortPathIdx);

  List<RestaurantDTO> getStoreLocation();
}
