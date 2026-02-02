package com.saravanan.springboot.springboot;

import com.saravanan.springboot.springboot.dao.UserRepository;
import com.saravanan.springboot.springboot.modal.User;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SpringbootApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringbootApplication.class, args);
	}

	@Bean
	public CommandLineRunner demo(UserRepository repository) {
		return (args) -> {
			if (!repository.findByUsername("admin").isPresent()) {
				repository.save(new User("admin", "admin", "ROLE_ADMIN"));
			}
			if (!repository.findByUsername("user").isPresent()) {
				repository.save(new User("user", "user", "ROLE_USER"));
			}
		};
	}
}
