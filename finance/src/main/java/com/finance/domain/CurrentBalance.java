package com.finance.domain;

import jakarta.persistence.*;
import java.math.BigDecimal;

import org.springframework.beans.propertyeditors.CurrencyEditor;

@Entity
public class CurrentBalance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    private BigDecimal balance;

// Constructors, getters, setters
public CurrentBalance(){

}
public CurrentBalance(User user, BigDecimal balance){
    this.user=user;
    this.balance= balance;

}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }


    
}

