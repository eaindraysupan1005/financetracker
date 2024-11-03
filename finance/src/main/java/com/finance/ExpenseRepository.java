package com.finance;

import com.finance.domain.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long>{

    @Query("SELECT e FROM Expense e WHERE e.user.id = :userId AND e.date = CURRENT_DATE")
    List<Expense> findDailyExpenseByUserId(Long userId);

    @Query("SELECT e FROM Expense e WHERE e.user.id = :userId AND e.date BETWEEN :startDate AND :endDate")
    List<Expense> findExpenseByUserIdAndDateRange(Long userId, LocalDate startDate, LocalDate endDate);

    @Query("SELECT SUM(e.amount) FROM Expense e WHERE e.user.id = :userId")
    Optional<BigDecimal> getTotalExpensesByUserId(Long userId);

    void deleteByIdAndUserId(Long id, Long userId);
}