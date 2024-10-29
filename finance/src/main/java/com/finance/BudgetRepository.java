package com.finance;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finance.domain.Budget;

public interface BudgetRepository extends JpaRepository<BudgetRepository, Long> {

    List<Budget> findAll(Long userId);

    Budget save(Budget category);

    void setCategoryName(String categoryName);

    void setSpent(double spent);

    void setLimit(double limit);

    void setIcon(String icon);

    void setDate(LocalDate date);
}
