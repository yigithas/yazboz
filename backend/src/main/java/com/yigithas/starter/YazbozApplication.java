package com.yigithas.starter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EntityScan(basePackages = {"com.yigithas"})
@ComponentScan(basePackages = {"com.yigithas"})
@SpringBootApplication
@EnableJpaRepositories(basePackages = {"com.yigithas"})
public class YazbozApplication {

	public static void main(String[] args) {
		SpringApplication.run(YazbozApplication.class, args);
	}

}
