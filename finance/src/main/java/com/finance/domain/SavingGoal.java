package com.finance.domain;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "saving_goal")
public class SavingGoal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate deadline;
    private String saving_name;
    private Double target_amount;
    private Double saved_amount;

    private SavingGoal(){ }

    private SavingGoal(String saving_name, Double target_amount, Double saved_amount, LocalDate deadline){
        this.saving_name =saving_name;
        this.target_amount= target_amount;
        this.saved_amount = saved_amount;
        this.deadline = deadline;
    }
    
    @ManyToOne(fetch = FetchType.LAZY) // Or FetchType.EAGER if necessary
    @JoinColumn(name = "user_id", nullable = false) // Foreign key to the User entity
    @JsonBackReference
    private User user;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public String getSaving_name() {
        return saving_name;
    }

    public void setSaving_name(String saving_name) {
        this.saving_name = saving_name;
    }

    public Double getTarget_amount() {
        return target_amount;
    }

    public void setTarget_amount(Double target_amount) {
        this.target_amount = target_amount;
    }

    public Double getSaved_amount() {
        return saved_amount;
    }

    public void setSaved_amount(Double saved_amount) {
        this.saved_amount = saved_amount;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
