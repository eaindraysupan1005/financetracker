package com.finance;

import com.finance.domain.Income;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Date; // or java.util.Date depending on your entity
import java.util.List;

@Repository
public interface IncomeRepository extends JpaRepository<Income, Long> {

    @Query("SELECT i FROM Income i WHERE i.user.id = :userId AND i.date = CURRENT_DATE") // Ensure date is being handled correctly
    List<Income> findDailyIncomeByUserId(Long userId);

    @Query("SELECT i FROM Income i WHERE i.user.id = :userId AND i.date BETWEEN :startDate AND :endDate")
    List<Income> findIncomeByUserIdAndDateRange(Long userId, Date startDate, Date endDate);

    void deleteByIdAndUserId(Long id, Long userId);
}
