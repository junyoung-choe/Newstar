package com.ssafy.newstar.domain.article.controller;

import static com.ssafy.newstar.domain.article.dto.ArticleResponse.createArticleResponse;
import static com.ssafy.newstar.util.response.SuccessResponseEntity.getResponseEntity;

import com.ssafy.newstar.domain.article.dto.ArticleResponse;
import com.ssafy.newstar.domain.article.service.ArticleService;
import com.ssafy.newstar.util.response.SuccessCode;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ArticleController {
  private final ArticleService articleService;
  @GetMapping("/articles/{category}")
  public ResponseEntity<?> getArticlesByCategory(Pageable pageable,
      @PathVariable("category") int category) {
    Slice<ArticleResponse> response = createArticleResponse(articleService.getArticlesByCategory(pageable, category));
    return getResponseEntity(SuccessCode.OK, response);
  }
}
