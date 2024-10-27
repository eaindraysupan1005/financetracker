package com.example.budgetapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.budgetapp.model.BudgetCategory;

public interface BudgetRepository extends JpaRepository<BudgetCategory, Long> {
}
