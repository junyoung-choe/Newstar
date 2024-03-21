package com.ssafy.newstar.domain.article.entity;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class Article {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "article_id")
  Long id;

  private String title;

  private String url;

  private LocalDateTime date;

  private int bcategory;

  private int scategory;

  private String imageUrl;

  @Column( length=10000 )
  private String content;

//  @OneToOne(fetch = FetchType.LAZY, optional = true)
//  private Summary summary;

  public static Article createArticle(String title, String url, LocalDateTime date, int Bcategory, int Scategory, String imageUrl, String content) {
    Article article = new Article();
    article.title = title;
    article.url = url;
    article.date = date;
    article.bcategory = Bcategory;
    article.scategory = Scategory;
    article.imageUrl = imageUrl;
    article.content = content;
    return article;
  }

//  public boolean hasSummary() {
//    return this.summary != null;
//  }
}
