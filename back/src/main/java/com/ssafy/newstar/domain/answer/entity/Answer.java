package com.ssafy.newstar.domain.answer.entity;

import com.ssafy.newstar.domain.member.entity.Member;
import com.ssafy.newstar.domain.question.entity.Question;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(exclude = {"question, member"})
public class Answer {
  @Id
  @GeneratedValue
  @Column(name = "answer_id")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "question_id")
  private Question question;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "member_id")
  private Member member;

  // 객관식이던 주관식이던 하나에 담기로 해용
  private String response;

  private LocalDateTime regDate;

  public static Answer createAnswer(Question question, Member member, String response) {
    Answer answer = new Answer();
    answer.question = question;
    answer.member = member;
    answer.response = response;
    answer.regDate = LocalDateTime.now();
    return answer;
  }

}
