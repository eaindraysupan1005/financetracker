package com.finance;

import com.finance.domain.Expense;
import com.finance.domain.Income;
import com.finance.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/expense")
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IncomeRepository incomeRepository;

    @Autowired
    private ExpenseService expenseService;

    // Fetch daily expenses
    @GetMapping("/daily/{userId}")
    public List<Expense> getDailyExpenses(@PathVariable Long userId) {
        return expenseRepository.findDailyExpenseByUserId(userId);
    }

    // Fetch weekly expenses
    @GetMapping("/weekly/{userId}")
    public ResponseEntity<List<Expense>> getWeeklyExpenses(@PathVariable Long userId) {
        LocalDate today = LocalDate.now();
        LocalDate startOfWeek = today.with(TemporalAdjusters.previousOrSame(java.time.DayOfWeek.MONDAY));
        LocalDate endOfWeek = today.with(TemporalAdjusters.nextOrSame(java.time.DayOfWeek.SUNDAY));

        List<Expense> expenses = expenseRepository.findExpenseByUserIdAndDateRange(userId, startOfWeek, endOfWeek);
        return new ResponseEntity<>(expenses, HttpStatus.OK);
    }

    @GetMapping("/weekly-report/{userId}")
    public ResponseEntity<Map<String, BigDecimal>> getWeeklyReport(@PathVariable long userId) {
        Map<String, BigDecimal> weeklyReport = expenseService.getWeeklyReportForUser(userId);
        System.out.printf("Weekly",weeklyReport);
        return ResponseEntity.ok(weeklyReport);
    }
    
    // Fetch monthly expenses
    @GetMapping("/monthly/{userId}")
    public ResponseEntity<List<Expense>> getMonthlyExpenses(@PathVariable Long userId) {
        LocalDate today = LocalDate.now();
        LocalDate startOfMonth = today.with(TemporalAdjusters.firstDayOfMonth());
        LocalDate endOfMonth = today.with(TemporalAdjusters.lastDayOfMonth());
        List<Expense> expenses = expenseRepository.findExpenseByUserIdAndDateRange(userId, startOfMonth, endOfMonth);

        return new ResponseEntity<>(expenses, HttpStatus.OK);
    }

      // Save an Expense Record
    @PostMapping("/add/{userId}")
    public ResponseEntity<Expense> addExpense(@PathVariable Long userId, @RequestBody Expense expenseData) {
        expenseData.setDate(LocalDate.now());

        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        User user = userOptional.get();

        BigDecimal totalIncome = incomeRepository.getTotalIncomeByUserId(userId).orElse(BigDecimal.ZERO);
        BigDecimal totalExpense = expenseRepository.getTotalExpensesByUserId(userId).orElse(BigDecimal.ZERO);
        BigDecimal projectedExpenseTotal = totalExpense.add(expenseData.getAmount());

        if(expenseData.getAmount().compareTo(BigDecimal.ZERO) == 0){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else if (totalIncome.compareTo(BigDecimal.ZERO) == 0) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }else if (projectedExpenseTotal.compareTo(totalIncome) > 0) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN); // Forbidden if expense would exceed income
        }else{
            expenseData.setUser(user);
            Expense savedExpense = expenseRepository.save(expenseData);
            return new ResponseEntity<>( savedExpense, HttpStatus.CREATED); // Return saved expense
        }
    }

     // Update expense
    @PutMapping("/update/{userId}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Long userId, @RequestBody Expense expenseData) {
        Optional<Expense> existingExpense = expenseRepository.findByIdAndUserId(expenseData.getId(), userId);
        if (existingExpense.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        if (expenseData.getAmount().compareTo(BigDecimal.ZERO) == 0) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        
        Expense updatedExpense = existingExpense.get();
        updatedExpense.setAmount(expenseData.getAmount());
        updatedExpense.setCategory(expenseData.getCategory());

        expenseRepository.save(updatedExpense);
        return new ResponseEntity<>(updatedExpense, HttpStatus.OK);
    }

    @DeleteMapping("/{userId}/{expenseId}")
    public ResponseEntity<String> deleteExpense(@PathVariable Long userId, @PathVariable Long expenseId) {
        try {
            Optional<Expense> expense = expenseRepository.findByIdAndUserId(expenseId, userId);
            if (expense.isPresent()) {
                expenseRepository.deleteByIdAndUserId(expenseId, userId);
                return new ResponseEntity<>("Expense Deleted", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Expense not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            // Log the exception to see the details
            e.printStackTrace();
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
