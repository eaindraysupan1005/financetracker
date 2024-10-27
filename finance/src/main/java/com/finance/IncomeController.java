package com.finance;

import com.finance.domain.Income;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/income")
public class IncomeController {

    @Autowired
    private IncomeRepository incomeRepository;

    // Fetch daily income
    @GetMapping("/daily/{userId}")
    public List<Income> getDailyIncome(@PathVariable Long userId) {
        return incomeRepository.findDailyIncomeByUserId(userId);
    }

    @GetMapping("/weekly/{userId}")
    public ResponseEntity<List<Income>> getWeeklyIncome(@PathVariable Long userId) {
        LocalDate today = LocalDate.now();
        LocalDate startOfWeek = today.with(TemporalAdjusters.previousOrSame(java.time.DayOfWeek.MONDAY));
        LocalDate endOfWeek = today.with(TemporalAdjusters.nextOrSame(java.time.DayOfWeek.SUNDAY));
    
        List<Income> incomes = incomeRepository.findIncomeByUserIdAndDateRange(userId,startOfWeek, endOfWeek);
        System.out.println("Start of week: " + startOfWeek);
        System.out.println("End of week: " + endOfWeek);
        System.out.println("Income List: " + incomes);
        return new ResponseEntity<>(incomes, HttpStatus.OK);
    }
    

    // Fetch monthly income
    @GetMapping("/monthly/{userId}")
    public ResponseEntity<List<Income>> getMonthlyIncome(@PathVariable Long userId) {
        LocalDate today = LocalDate.now();
        LocalDate startOfMonth = today.with(TemporalAdjusters.firstDayOfMonth());
        LocalDate endOfMonth = today.with(TemporalAdjusters.lastDayOfMonth());
        List<Income> incomes = incomeRepository.findIncomeByUserIdAndDateRange(userId, startOfMonth, endOfMonth);

        return new ResponseEntity<>(incomes, HttpStatus.OK);
    }

    // Delete an income record
    @DeleteMapping("/{userId}/{incomeId}")
    public void deleteIncome(@PathVariable Long userId, @PathVariable Long incomeId) {
        incomeRepository.deleteByIdAndUserId(incomeId, userId);
    }
}
