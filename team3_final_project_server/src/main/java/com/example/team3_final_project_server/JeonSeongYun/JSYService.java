package com.example.team3_final_project_server.JeonSeongYun;

import com.example.team3_final_project_server.dto.*;

import java.util.List;
import java.util.Optional;

public interface JSYService {
    List<RestaurantListDTO> getRstListByCategory(String category) throws Exception;

    ResponseDTO getJwtAdminLoginCheck(String adminId, String adminPw);

    String SaveOwnerInfo(UserDTO user);

    List<ReservationDTO> getResList(String seatId);

    List<SeatDTO> TodayLoadSeat(String resIdx);

    Optional<Integer> findResIdxByUser(int userIdx);

    boolean updateReservationStatus(ReservationDTO dto);

    List<ReservationDTO> findAllByResIdx(String resIdx);

    List<ReservationDTO> getPastReservations(String resIdx);

//    List<OwnerDTO> getuserListAndImg(int userIdx);
}
