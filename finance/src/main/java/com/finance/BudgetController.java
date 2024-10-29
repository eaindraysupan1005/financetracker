package com.finance;

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

import com.finance.domain.Budget;

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

    @PostMapping("/budgets")
    public ResponseEntity<Budget> addCategory(@RequestBody Budget category){
        Budget savedCategory = budgetRepository.save(category);
        return new ResponseEntity<>(savedCategory, HttpStatus.CREATED);
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
