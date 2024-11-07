package com.finance;

import java.util.List;
import java.util.Optional;

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

import com.finance.domain.SavingGoal;
import com.finance.domain.User;

@RestController
@RequestMapping("/saving")
public class SavingGoalController {
    
    @Autowired
    private SavingGoalRepository savingGoalRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{userId}")
    public ResponseEntity<List<SavingGoal>> getAllSavingGoals(){
        List<SavingGoal> savingGoals = savingGoalRepository.findAll();
        return new ResponseEntity<>(savingGoals, HttpStatus.OK);
    }

    @PostMapping("/add/{userId}")
    public ResponseEntity<SavingGoal> addGoal(@PathVariable Long userId, @RequestBody SavingGoal savingGoalData) {

        // Retrieve the User directly using UserRepository
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        savingGoalData.setUser(userOptional.get()); 
        SavingGoal savedGoal = savingGoalRepository.save(savingGoalData);
        return new ResponseEntity<>(savedGoal, HttpStatus.CREATED); // Return saved Income
    }

    @DeleteMapping("/{userId}/{id}")
    public ResponseEntity<Void> deleteGoal (@PathVariable Long id){
        if(savingGoalRepository.existsById(id)){
            savingGoalRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<> (HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{userId}/{id}")
    public ResponseEntity<SavingGoal> updateCategory(@RequestBody SavingGoal savingGoalData, @PathVariable Long userId, @PathVariable long id ){

        Optional<SavingGoal> savingGoal = savingGoalRepository.findByIdAndUserId(id, userId);
        if(!savingGoal.isPresent()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        savingGoalData.setId(id);

        savingGoalRepository.save(savingGoalData);
        return new ResponseEntity<> (savingGoalData, HttpStatus.OK);
    }
}


