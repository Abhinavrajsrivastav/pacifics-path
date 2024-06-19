package com.eduland.eduland;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })
public class EdulandApplication {

	public static void main(String[] args) {
		SpringApplication.run(EdulandApplication.class, args);
	}

}
