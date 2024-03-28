package com.ssafy.newstar.domain.article.dto;

import com.ssafy.newstar.domain.article.entity.Article;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.ToString;
import org.springframework.data.domain.Slice;

@Data
@ToString
public class ArticleResponse {
  Long article_id;

  private String title;

  private String url;

  private LocalDateTime date;

  private int Bcategory;

  private int Scategory;

  private String image_url;

  private String content;


  public static ArticleResponse createArticleResponse(Article article) {
    ArticleResponse articleResponse = new ArticleResponse();
    articleResponse.article_id = article.getId();
    articleResponse.title = article.getTitle();
    articleResponse.url = article.getUrl();
    articleResponse.date = article.getDate();
    articleResponse.Bcategory = article.getBcategory();
    articleResponse.Scategory = article.getScategory();
    articleResponse.image_url = article.getImageUrl();
    articleResponse.content = article.getSummary();
    return articleResponse;
  }

  public static Slice<ArticleResponse> createArticleResponse(Slice<Article> articles) {
    return articles.map(ArticleResponse::createArticleResponse);
  }
}
