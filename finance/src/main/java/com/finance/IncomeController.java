package com.finance;

import com.finance.domain.Income;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/income/{userId}")
public class IncomeController {

    @Autowired
    private IncomeRepository incomeRepository;

    // Fetch daily income
    @GetMapping("/daily")
    public List<Income> getDailyIncome(@PathVariable Long userId) {
        return incomeRepository.findDailyIncomeByUserId(userId);
    }

    // Fetch weekly income
    @GetMapping("/weekly")
    public List<Income> getWeeklyIncome(@PathVariable Long userId) {
        LocalDate today = LocalDate.now();
        LocalDate startOfWeek = today.with(TemporalAdjusters.previousOrSame(java.time.DayOfWeek.MONDAY));
        LocalDate endOfWeek = today.with(TemporalAdjusters.nextOrSame(java.time.DayOfWeek.SUNDAY));
        return incomeRepository.findIncomeByUserIdAndDateRange(userId, java.sql.Date.valueOf(startOfWeek), java.sql.Date.valueOf(endOfWeek));
    }

    // Fetch monthly income
    @GetMapping("/monthly")
    public List<Income> getMonthlyIncome(@PathVariable Long userId) {
        LocalDate today = LocalDate.now();
        LocalDate startOfMonth = today.with(TemporalAdjusters.firstDayOfMonth());
        LocalDate endOfMonth = today.with(TemporalAdjusters.lastDayOfMonth());
        return incomeRepository.findIncomeByUserIdAndDateRange(userId, java.sql.Date.valueOf(startOfMonth), java.sql.Date.valueOf(endOfMonth));
    }

    // Delete an income record
    @DeleteMapping("/{incomeId}")
    public void deleteIncome(@PathVariable Long userId, @PathVariable Long incomeId) {
        incomeRepository.deleteByIdAndUserId(incomeId, userId);
    }
}
