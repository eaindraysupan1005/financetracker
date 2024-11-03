package com.finance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/balance")
public class BalanceController {

    @Autowired
    private BalanceService balanceService;

    @GetMapping("/{userId}")
    public ResponseEntity<BigDecimal> getCurrentBalance(@PathVariable Long userId) {
        BigDecimal balance = balanceService.getCurrentBalance(userId);
        return new ResponseEntity<>(balance, HttpStatus.OK);
    }
}
