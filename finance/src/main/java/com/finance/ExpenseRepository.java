package com.finance;

import com.finance.domain.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long>{

    @Query("SELECT e FROM Expense e WHERE e.user.id = :userId AND e.date = CURRENT_DATE")
    List<Expense> findDailyExpenseByUserId(Long userId);

    @Query("SELECT e FROM Expense e WHERE e.user.id = :userId AND e.date BETWEEN :startDate AND :endDate")
    List<Expense> findExpenseByUserIdAndDateRange(Long userId, LocalDate startDate, LocalDate endDate);

    void deleteByIdAndUserId(Long id, Long userId);
}