package com.finance;


import com.finance.domain.Budget;
import com.finance.domain.Income;
import com.finance.domain.User;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import com.finance.domain.Budget;

@RestController
@RequestMapping("/budgets")
public class BudgetController {
    
    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{userId}")
    public ResponseEntity<List<Budget>> getAllCategories(){
        List<Budget> categories = budgetRepository.findAll();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @PostMapping("/add/{userId}")
    public ResponseEntity<Budget> addIncome(@PathVariable Long userId, @RequestBody Budget budgetData) {
        budgetData.setDate(LocalDate.now()); // Set current date

        // Retrieve the User directly using UserRepository
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        budgetData.setUser(userOptional.get()); // Set the User to the Income
        Budget savedBudget = budgetRepository.save(budgetData);
        return new ResponseEntity<>(savedBudget, HttpStatus.CREATED); // Return saved Income
    }

    @DeleteMapping("/budgets/{id}")
    public ResponseEntity<Void> deleteCategory (@PathVariable Long id){
        if(budgetRepository.existsById(id)){
            budgetRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<> (HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{userId}/{id}")
    public ResponseEntity<Budget> updateCategory(@RequestBody Budget budgetData, @PathVariable Long userId, @PathVariable long id ){

        Optional<Budget>  budget = budgetRepository.findByIdAndUserId(id, userId);
        if(!budget.isPresent()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        budgetData.setId(id);

        budgetRepository.save(budgetData);
        return new ResponseEntity<> (budgetData, HttpStatus.OK);
    }
}
