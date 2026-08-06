package com.yigithas.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yigithas.models.Writers;

@Repository
public interface WritersRepository extends JpaRepository<Writers, Long> {
    
	Optional<Writers> findByNickName(String nickName);
}