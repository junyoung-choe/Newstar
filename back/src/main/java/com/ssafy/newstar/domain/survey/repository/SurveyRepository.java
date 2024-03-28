package com.ssafy.newstar.domain.survey.repository;

import com.ssafy.newstar.domain.survey.entity.Survey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SurveyRepository extends JpaRepository<Survey, Long> {

}
