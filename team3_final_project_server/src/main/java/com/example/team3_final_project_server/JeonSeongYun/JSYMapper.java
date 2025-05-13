package com.example.team3_final_project_server.JeonSeongYun;

import com.example.team3_final_project_server.dto.ReservationDTO;
import com.example.team3_final_project_server.dto.RestaurantListDTO;
import com.example.team3_final_project_server.dto.UserDTO;
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
}
