package com.ip.kino.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeRequests(authorize -> authorize
                        .requestMatchers("/login","/api/v1/**","/images/**").permitAll() // Allow access to login page
                        .anyRequest().authenticated()    // Require authentication for other endpoints
                )
                .formLogin(form -> form
                        .loginPage("/login")              // Set custom login page URL
                        .defaultSuccessUrl("/dashboard")  // Redirect to dashboard after successful login
                )
                .logout(logout -> logout
                        .logoutUrl("/logout")            // Set custom logout URL
                        .logoutSuccessUrl("/login")      // Redirect to login page after logout
                );

        return http.build();
    }
}