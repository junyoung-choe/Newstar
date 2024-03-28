package com.ssafy.newstar.domain.survey.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class Survey {
  @Id
  @GeneratedValue
  @Column(name = "survey_id")
  private Long id;

  private String title;

  private LocalDateTime startDate;

  private LocalDateTime endDate;

  public static Survey createSurvey(String title, LocalDateTime startDate, LocalDateTime endDate) {
    Survey survey = new Survey();
    survey.title = title;
    survey.startDate = startDate;
    survey.endDate = endDate;
    return survey;
  }
}
