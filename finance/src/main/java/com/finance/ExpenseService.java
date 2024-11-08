package com.finance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finance.domain.Expense;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    public Map<String, BigDecimal> getWeeklyReportForUser(long userId) {

        LocalDate today = LocalDate.now();
        LocalDate startOfWeek = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDate endOfWeek = today.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));

        // Fetch expenses grouped by category
        List<Object[]> expenses = expenseRepository.findExpensesByUserIdAndDateRangeGroupedByCategory(userId, startOfWeek, endOfWeek);

        // Initialize the report data with categories
        Map<String, BigDecimal> categoryTotals = new HashMap<>();
        categoryTotals.put("Food", BigDecimal.ZERO);
        categoryTotals.put("Transportation", BigDecimal.ZERO);
        categoryTotals.put("Entertainment", BigDecimal.ZERO);
        categoryTotals.put("Shopping", BigDecimal.ZERO);
        categoryTotals.put("Other", BigDecimal.ZERO);

        // Process the results and sum amounts per category
        for (Object[] result : expenses) {
            String category = (String) result[0];  // Category name
            BigDecimal amount = (BigDecimal) result[1];  // Sum of amounts for that category

            // Update category totals
            if (categoryTotals.containsKey(category)) {
                categoryTotals.put(category, categoryTotals.get(category).add(amount));
            } else {
                // If the category is not in the predefined categories, add to "Other"
                categoryTotals.put("Other", categoryTotals.get("Other").add(amount));
            }
        }

        return categoryTotals;
    }
}
