package com.ssafy.newstar.domain.answer.service;

import com.ssafy.newstar.domain.answer.dto.AnswerRequest;
import com.ssafy.newstar.domain.answer.entity.Answer;
import com.ssafy.newstar.domain.answer.repository.AnswerRepository;
import com.ssafy.newstar.domain.member.entity.Member;
import com.ssafy.newstar.domain.member.repository.MemberRepository;
import com.ssafy.newstar.domain.question.entity.Question;
import com.ssafy.newstar.domain.question.repository.QuestionRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AnswerService {

  private final AnswerRepository answerRepository;
  private final MemberRepository memberRepository;
  private final QuestionRepository questionRepository;
  public boolean haveAnswer(Long memberId) {
    Member member = memberRepository.getReferenceById(memberId);
    Optional<Answer> answer = answerRepository.findFirstByMember(member);

    return answer.isPresent();
  }

  public void createAnswer(Long memberId, AnswerRequest[] requests) {
    for(AnswerRequest answerRequest : requests) {

      Question question = questionRepository.getReferenceById(answerRequest.getQuestionId());
      Member member = memberRepository.getReferenceById(memberId);

      Answer answer = Answer.createAnswer(question, member, answerRequest.getResponse());
      answerRepository.save(answer);
    }
  }
}
