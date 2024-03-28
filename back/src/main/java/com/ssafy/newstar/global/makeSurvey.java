package com.ssafy.newstar.global;

import com.ssafy.newstar.domain.question.entity.QType;
import com.ssafy.newstar.domain.question.entity.Question;
import com.ssafy.newstar.domain.survey.entity.Survey;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class makeSurvey {
  private final InitService initService;
  @PostConstruct
  public void init() {
    initService.surveyOne();
  }

  @Component
  @Transactional
  @RequiredArgsConstructor
  static class InitService {
    private final EntityManager em;

    public void surveyOne() {

      Survey survey = Survey.createSurvey("서비스 만족도 조사", LocalDateTime.now(),
          LocalDateTime.now().plusDays(14));
      em.persist(survey);

      Question question1 = Question.createQuestion(survey, QType.MULTIPLE, "서비스를 이용한 환경이 무엇인가요?");
      Question question2 = Question.createQuestion(survey, QType.MULTIPLE, "뉴스 기사의 카테고리가 다양한가요?");
      Question question3 = Question.createQuestion(survey, QType.MULTIPLE, "웹 사이트의 디자인은 괜찮나요?");
      Question question4 = Question.createQuestion(survey, QType.MULTIPLE, "웹 사이트의 로딩 속도에 만족하십니까?");
      Question question5 = Question.createQuestion(survey, QType.MULTIPLE,
          "웹 사이트 사용자 경험(페이지 이동의 편의성, 버튼 및 링크의 명확성 등)에 만족하십니까?");
      Question question6 = Question.createQuestion(survey, QType.SUBJECT, "개선할 점이 있다면 적어주세요.");
      Question question7 = Question.createQuestion(survey, QType.SUBJECT,
          "기프티콘 전송을 위해 휴대폰 번호를 입력해주세요.");
      em.persist(question1);
      em.persist(question2);
      em.persist(question3);
      em.persist(question4);
      em.persist(question5);
      em.persist(question6);
      em.persist(question7);
    }
  }
}
