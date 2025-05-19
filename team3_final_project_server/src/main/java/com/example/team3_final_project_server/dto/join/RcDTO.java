package com.example.team3_final_project_server.dto.join;

import com.example.team3_final_project_server.dto.ConvenientDTO;
import com.example.team3_final_project_server.dto.RestConvenientDTO;
import lombok.Data;

@Data
public class RcDTO {
  private RestConvenientDTO restConvenientDTO;
  private ConvenientDTO convenientDTO;
}
