package com.edubbell.edubell.Models;


public class SignupUser {
    private String email;
    private String password;

    public SignupUser(String email,String password) {
        this.email = email;
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }
}
