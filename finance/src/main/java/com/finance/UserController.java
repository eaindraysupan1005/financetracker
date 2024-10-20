package com.finance;

import com.finance.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Signup method
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        // Check if the email is already taken
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            return new ResponseEntity<>("Email is already in use", HttpStatus.BAD_REQUEST);
        }

        // Save the new user
        userRepository.save(user);
        return new ResponseEntity<>("Signup successful", HttpStatus.CREATED);
    }

    // Login method
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginRequest) {
        // Find the user by email
        Optional<User> existingUser = userRepository.findByEmail(loginRequest.getEmail());

        if (existingUser.isPresent()) {
            // Check if the password matches
            User user = existingUser.get();
            if (user.getPassword().equals(loginRequest.getPassword())) {
                return new ResponseEntity<>("Login successful", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Invalid password", HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }
}

