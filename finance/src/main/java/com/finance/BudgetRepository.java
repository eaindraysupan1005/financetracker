package com.finance;

import java.time.LocalDate;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.finance.domain.Budget;

public interface BudgetRepository extends JpaRepository<Budget, Long> {

    List<Budget> findAll();

    List<Budget> findBudgetByUserId(Long userId);

    Optional<Budget> findByIdAndUserId(Long id, Long userId);

}
