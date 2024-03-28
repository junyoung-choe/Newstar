package com.ssafy.newstar.domain.answer.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.ArrayList;
import lombok.Data;

@Data
public class AnswerRequest {
  @NotNull
  private Long questionId;

  @NotBlank
  private String response;
}

