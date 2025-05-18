package com.example.team3_final_project_server.JeonSeongYun;

import com.example.team3_final_project_server.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface JSYMapper {
    List<RestaurantListDTO> getRstListByCategory(String category) throws Exception;

    Optional<UserDTO> findByAdminId(String adminId);

    boolean existsByUserId(String userId);

    boolean existsByUserEmail(String userEmail);

    void saveOwner(UserDTO newUser);

    List<ReservationDTO> getResList(String seatId);

    List<SeatDTO> TodayLoadSeat(String resIdx);

    Integer findResIdxByUser(int userIdx);

    int updateReservationStatus(ReservationDTO dto);

    List<ReservationDTO> findAllByResIdx(String resIdx);

    List<ReservationDTO> getPastReservations(String resIdx);

    int updateReservationStatusHistory(ReservationDTO dto);

//    List<OwnerDTO> getuserListAndImg(int userIdx);
}
