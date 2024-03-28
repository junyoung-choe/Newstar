package com.ssafy.newstar.domain.answer.repository;

import com.ssafy.newstar.domain.answer.entity.Answer;
import com.ssafy.newstar.domain.member.entity.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
  Optional<Answer> findFirstByMember(Member member);
}
