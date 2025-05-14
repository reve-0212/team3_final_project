package com.example.team3_final_project_server.SimJiHyun.mapper;

import com.example.team3_final_project_server.dto.ReservationDTO;
import com.example.team3_final_project_server.dto.RestaurantDTO;
import com.example.team3_final_project_server.dto.SeatDTO;
import com.example.team3_final_project_server.dto.UserDTO;
import com.example.team3_final_project_server.dto.join.*;
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

  List<ReservationRestaurantJoinDTO> userReservation(int userIdx);

  ReservationRestaurantJoinDTO getBook(int reservationIdx, int restaurantIdx);

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

  List<SeatDTO> loadSeat(int resIdx);

  //  메뉴 예약하기
  void reserveMenu(int reservationIdx, int menuIdx, int menuQuantity);

  //  예약 번호에 해당하는 정보 가져오기
  ReservationDTO getReg(int reservationIdx);

  //  예약 번호에 해당하는 메뉴 정보 가져오기
  List<ReservationSelectedMenuMenuJoinDTO> getMenuInfo(int reservationIdx);

  //  예약 번호에 해당하는 가게 정보 가져오기
  ReservationRestaurantJoinDTO getStoreInfo(int reservationIdx);

  List<RrsmDTO> getMenu(int reservationIdx, int restaurantIdx);

  //  히스토리 저장용
  void saveHistory(int reservationIdx, int resIdx, String reservationDate,
                   int rsvPeople, int rsvMan, int rsvWoman, int rsvBaby,
                   int menuIdx, String menuName, int menuPrice, int menuSCount, int menuSTP);
}
