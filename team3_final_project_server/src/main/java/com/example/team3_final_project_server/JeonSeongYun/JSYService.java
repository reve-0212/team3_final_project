package com.example.team3_final_project_server.JeonSeongYun;

import com.example.team3_final_project_server.dto.ResponseDTO;
import com.example.team3_final_project_server.dto.RestaurantListDTO;

import java.util.List;

public interface JSYService {
    List<RestaurantListDTO> getRstListByCategory(String category) throws Exception;

    ResponseDTO getJwtOwnerLoginCheck(String ownerId, String ownerPw);

//    ResponseDTO getJwtOwnerLoginCheck(String ownerId, String ownerPw);
}
