package com.finance.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "budget")
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate Date;
    private String categoryName;
    private Double limit;
    private Double spent;
    private String icon;
    

    private Budget(){ }

    private Budget(String categoryName, double limit, double spent, String icon){
        this.categoryName =categoryName;
        this.limit = limit;
        this.spent = spent;
        this.icon = icon;
    }
    
    @ManyToOne(fetch = FetchType.LAZY) // Or FetchType.EAGER if necessary
    @JoinColumn(name = "user_id", nullable = false) // Foreign key to the User entity
    @JsonBackReference
    private User user;

    public long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return Date;
    }

    public void setDate(LocalDate date) {
        this.Date = date;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public double getLimit() {
        return limit;
    }

    public void setLimit(Double limit) {
        this.limit = limit;
    }

    public double getSpent() {
        return spent;
    }

    public void setSpent(Double spent) {
        this.spent = spent;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
