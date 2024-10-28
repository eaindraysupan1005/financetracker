package com.finance.domain;

import jakarta.persistence.*;

import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "expense")
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private LocalDate date;
    private String category;
    private double amount;

    private Expense(){ }

    private Expense(String category, double amount){
        this.category=category;
        this.amount=amount;
    }
    
    @ManyToOne(fetch = FetchType.LAZY) // Or FetchType.EAGER if necessary
    @JoinColumn(name = "user_id", nullable = false) // Foreign key to the User entity
    @JsonBackReference
    private User user;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    

}