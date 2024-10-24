package com.finance.domain;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "income")
public class Income {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private Date date;
    private String category;
    private double amount;

    private Income(){ }

    private Income(String category, double amount){
        this.category=category;
        this.amount=amount;
    }
    
    @ManyToOne(fetch = FetchType.LAZY) // Or FetchType.EAGER if necessary
    @JoinColumn(name = "user_id", nullable = false) // Foreign key to the User entity
    private User user;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
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
