package com.finance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class BalanceService {

    @Autowired
    private IncomeRepository incomeRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    // Method to calculate and return the current balance for a user
    public BigDecimal getCurrentBalance(Long userId) {
        // Sum all income for the user
        BigDecimal totalIncome = incomeRepository.getTotalIncomeByUserId(userId).orElse(BigDecimal.ZERO);
        
        // Sum all expenses for the user
        BigDecimal totalExpenses = expenseRepository.getTotalExpensesByUserId(userId).orElse(BigDecimal.ZERO);
        
        // Calculate balance
        return totalIncome.subtract(totalExpenses);
    }
}
