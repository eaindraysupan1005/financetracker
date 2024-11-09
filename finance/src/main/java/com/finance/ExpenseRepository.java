package com.finance;

import com.finance.domain.Expense;
import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

        @Query("SELECT e FROM Expense e WHERE e.user.id = :userId AND e.date = CURRENT_DATE")
        List<Expense> findDailyExpenseByUserId(Long userId);

        @Query("SELECT e FROM Expense e WHERE e.user.id = :userId AND e.date BETWEEN :startDate AND :endDate")
        List<Expense> findExpenseByUserIdAndDateRange(Long userId, LocalDate startDate, LocalDate endDate);

        @Query("SELECT SUM(e.amount) FROM Expense e WHERE e.user.id = :userId")
        Optional<BigDecimal> getTotalExpensesByUserId(Long userId);

        Optional<Expense> findByIdAndUserId(Long id, Long userId);

        @Modifying
        @Transactional
        @Query("DELETE FROM Expense e WHERE e.id = :expenseId AND e.user.id = :userId")
        int deleteByIdAndUserId(@Param("expenseId") Long incomeId, @Param("userId") Long userId);

        @Query("SELECT e.category, SUM(e.amount) " +
                        "FROM Expense e " +
                        "WHERE e.user.id = :userId AND e.date >= :startOfWeek AND e.date <= :endOfWeek " +
                        "GROUP BY e.category")
        List<Object[]> findExpensesByUserIdAndDateRangeGroupedByCategory(@Param("userId") long userId,
                        @Param("startOfWeek") LocalDate startOfWeek,
                        @Param("endOfWeek") LocalDate endOfWeek);

        @Query("SELECT e FROM Expense e WHERE e.user.id = :userId ORDER BY e.date DESC, e.id DESC")
        List<Expense> findLatestExpensesByUserId(@Param("userId") Long userId, Pageable pageable);
}