package com.ssafy.newstar.util.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
  // 회원
  KEY_NOT_FOUND(HttpStatus.NOT_FOUND, "키가 존재하지 않습니다."),
  MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 유저를 찾을 수 없습니다."),

  // 기사
  ARTICLE_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 기사를 찾을 수 없습니다."),
  CATEGORY_NOT_ONE(HttpStatus.BAD_REQUEST, "카테고리는 하나만 선택해야 합니다."),
  CATEGORY_NOT_SELECTED(HttpStatus.BAD_REQUEST, "카테고리를 적어도 하나 선택해야 합니다."),
  // 키워드
  KEYWORD_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 키워드를 찾을 수 없습니다."),

  INVALID_INPUT_VALUE(HttpStatus.BAD_REQUEST, "입력 조건을 확인하세요");

  private final HttpStatus httpStatus;
  private final String message;
}
