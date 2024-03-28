package com.ssafy.newstar.domain.question.repository;

import com.ssafy.newstar.domain.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {

}
