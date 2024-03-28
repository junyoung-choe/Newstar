package com.ssafy.newstar.domain.question.entity;

import com.ssafy.newstar.domain.survey.entity.Survey;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(exclude = {"survey"})
public class Question {
  @Id
  @GeneratedValue
  @Column(name = "question_id")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "survey_id")
  private Survey survey;

  @Enumerated(EnumType.STRING)
  private QType qType;

  // 질문내용 !
  private String content;

  public static Question createQuestion(Survey survey, QType qType, String content) {
    Question question = new Question();
    question.survey = survey;
    question.qType = qType;
    question.content = content;
    return question;
  }

}
