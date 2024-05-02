package com.edubbell.edubell.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity(name="sign_up")
public class UserTable {

    @Column
    public String classId;

    @Column
    public String email;
    @Column
    public String password;

    //4. Add a new user into the database
    public UserTable(String classId, String email, String password) {
        this.classId = classId;
        this.email = email;
        this.password = password;
    }  

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getClassId() {
        return classId;
    }
}
