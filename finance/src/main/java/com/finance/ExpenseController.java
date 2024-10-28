package com.finance;

import com.finance.domain.Expense;
import com.finance.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/expense")
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private UserRepository userRepository;

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

    // Fetch monthly expenses
    @GetMapping("/monthly/{userId}")
    public ResponseEntity<List<Expense>> getMonthlyExpenses(@PathVariable Long userId) {
        LocalDate today = LocalDate.now();
        LocalDate startOfMonth = today.with(TemporalAdjusters.firstDayOfMonth());
        LocalDate endOfMonth = today.with(TemporalAdjusters.lastDayOfMonth());
        List<Expense> expenses = expenseRepository.findExpenseByUserIdAndDateRange(userId, startOfMonth, endOfMonth);

        return new ResponseEntity<>(expenses, HttpStatus.OK);
    }

    // Delete an expense record
    @DeleteMapping("/{userId}/{expenseId}")
    public void deleteExpense(@PathVariable Long userId, @PathVariable Long expenseId) {
        expenseRepository.deleteByIdAndUserId(expenseId, userId);
    }

    //Save an Expense Record
    @PostMapping("/add/{userId}")
    public ResponseEntity<Expense> addExpense(@PathVariable Long userId, @RequestBody Expense expenseData) {
        expenseData.setDate(LocalDate.now()); // Set current date

        // Retrieve the User directly using UserRepository
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        expenseData.setUser(userOptional.get()); // Set the User to the Expense
        Expense savedExpense = expenseRepository.save(expenseData);
        return new ResponseEntity<>(savedExpense, HttpStatus.CREATED); // Return saved expense
    }
}
