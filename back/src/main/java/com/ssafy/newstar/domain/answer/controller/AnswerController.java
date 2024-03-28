package com.ssafy.newstar.domain.answer.controller;

import static com.ssafy.newstar.domain.answer.dto.CheckResponse.getCheckResponse;
import static com.ssafy.newstar.util.response.SuccessResponseEntity.getResponseEntity;

import com.ssafy.newstar.domain.answer.dto.AnswerRequest;
import com.ssafy.newstar.domain.answer.service.AnswerService;
import com.ssafy.newstar.util.response.ErrorCode;
import com.ssafy.newstar.util.response.SuccessCode;
import com.ssafy.newstar.util.response.exception.GlobalException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AnswerController {

  private final AnswerService answerService;
  @GetMapping("/answers")
  public ResponseEntity<?> haveAnswer(HttpServletRequest request) {
    Long memberId = (Long) request.getAttribute("memberId");
    boolean b = answerService.haveAnswer(memberId);

    return getResponseEntity(SuccessCode.OK, getCheckResponse(b));
  }

  @PostMapping("/answers")
  public ResponseEntity<?> createAnswer(HttpServletRequest request,
    @Valid @RequestBody AnswerRequest[] answerRequest, BindingResult bindingResult) {
    Long memberId = (Long) request.getAttribute("memberId");
    if (bindingResult.hasErrors()) throw new GlobalException(ErrorCode.INVALID_INPUT_VALUE);

    answerService.createAnswer(memberId, answerRequest);
    return getResponseEntity(SuccessCode.CREATED);
  }
}
