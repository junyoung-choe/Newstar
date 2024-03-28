package com.ssafy.newstar.domain.record.entity;

import com.ssafy.newstar.domain.article.entity.Article;
import com.ssafy.newstar.domain.member.entity.Member;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(exclude = {"member", "article"})
public class Record {
  @Id
  @GeneratedValue
  @Column(name = "record_id")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "member_id")
  private Member member;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "article_id")
  private Article article;

  @ColumnDefault("false")
  private Boolean likes;

  public  static Record createRecode(Member member, Article article) {
    Record record = new Record();
    record.member = member;
    record.article = article;
    record.likes = false;
    return record;
  }

  public void updateLikes(boolean likes) {
    this.likes = likes;
  }
}
