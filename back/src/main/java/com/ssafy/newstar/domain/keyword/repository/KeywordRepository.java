package com.ssafy.newstar.domain.keyword.repository;

import com.ssafy.newstar.domain.keyword.entity.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KeywordRepository extends JpaRepository<Keyword, Long> {

}
