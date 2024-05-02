// Controller.java
package com.edubbell.edubell.Controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.edubbell.edubell.Models.SignupUser;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class Controller {
    
    
    @PostMapping("/sign-up")
    public void createUser(@RequestBody SignupUser user) {
        System.out.println("Email: " + user.getEmail());
        System.out.println("Password: " + user.getPassword());
        // Process the user object here (save to database, etc.)
    }
}
