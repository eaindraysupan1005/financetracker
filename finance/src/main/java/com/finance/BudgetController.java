package com.finance;

import com.finance.domain.Budget;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/budgets")
public class BudgetController {
    
    @Autowired
    private BudgetRepository budgetRepository;

    @GetMapping
    public ResponseEntity<List<Budget>> getAllCategories(){
        List<BudgetRepository> categories = budgetRepository.findAll();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Budget> addCategory(@RequestBody Budget category){
        Budget savedCategory = budgetRepository.save(category);
        return new ResponseEntity<>(savedCategory, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory (@PathVariable Long id){
        if(budgetRepository.existsById(id)){
            budgetRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<> (HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<BudgetRepository> updateCategory(@PathVariable Long id, @RequestBody Budget updatedCategory) {
        return budgetRepository.findById(id)
            .map(existingCategory -> {
                existingCategory.setCategoryName(updatedCategory.getCategoryName());
                existingCategory.setLimit(updatedCategory.getLimit());
                existingCategory.setSpent(updatedCategory.getSpent());
                existingCategory.setIcon(updatedCategory.getIcon());
                existingCategory.setDate(updatedCategory.getDate());
                BudgetRepository savedCategory = budgetRepository.save(existingCategory);
                return new ResponseEntity<>(savedCategory, HttpStatus.OK);
            })
            .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
