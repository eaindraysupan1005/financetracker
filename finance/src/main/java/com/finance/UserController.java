package com.finance;

import com.finance.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

// @CrossOrigin(origins = "https://miniature-succotash-x557wvxpvvqphggg-3000.app.github.dev") // Adjust the URL accordingly
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

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User loginRequest) {
        Map<String, Object> response = new HashMap<>();
        
        // Find the user by email
        Optional<User> existingUser = userRepository.findByEmail(loginRequest.getEmail());
    
        if (existingUser.isPresent()) {
            // Check if the password matches
            User user = existingUser.get();
            if (user.getPassword().equals(loginRequest.getPassword())) {
                response.put("message", "Login successful");
                response.put("user", Map.of("id", user.getId())); // Add user ID to the response
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("message", "Invalid password");
                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            }
        } else {
            response.put("message", "User not found");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
    

}

