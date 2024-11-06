package com.finance;

import java.time.LocalDate;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.finance.domain.SavingGoal;

public interface SavingGoalRepository extends JpaRepository<SavingGoal, Long> {

    List<SavingGoal> findAll();

    List<SavingGoal> findSavingGoalByUserId(Long userId);

    Optional<SavingGoal> findByIdAndUserId(Long id, Long userId);

}