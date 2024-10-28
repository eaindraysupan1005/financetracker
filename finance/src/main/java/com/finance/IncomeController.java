package com.finance;

import com.finance.domain.Income;
import com.finance.domain.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/income")
public class IncomeController {

    @Autowired
    private IncomeRepository incomeRepository;

    @Autowired
    private UserRepository userRepository;

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

     //Save an income Record
    @PostMapping("/add/{userId}")
    public ResponseEntity<Income> addIncome(@PathVariable Long userId, @RequestBody Income incomeData) {
        incomeData.setDate(LocalDate.now()); // Set current date

        // Retrieve the User directly using UserRepository
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        incomeData.setUser(userOptional.get()); // Set the User to the Income
        Income savedIncome = incomeRepository.save(incomeData);
        return new ResponseEntity<>(savedIncome, HttpStatus.CREATED); // Return saved Income
    }

    
}
