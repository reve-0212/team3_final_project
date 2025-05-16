package com.example.team3_final_project_server.dto;

import lombok.Data;

@Data
public class ReviewDTO {
  private int reviewIdx;
  private int userIdx;
  private int resIdx;
  private double reviewRating;
  private String reviewContent;
  private String reviewWriteDate;
  private String reviewImage1;
  private String reviewImage2;
  private String reviewImage3;
  private String reviewOwnerContents;

  private String userNick; // 사장페이지에서 리뷰 작성자 불러오기 위해서
}