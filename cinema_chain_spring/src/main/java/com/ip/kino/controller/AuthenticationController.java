package com.ip.kino.controller;

import com.ip.kino.config.AuthenticationResponse;
import com.ip.kino.dto.LoginDto;
import com.ip.kino.dto.RegisterDto;
import com.ip.kino.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/public/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterDto request){
        AuthenticationResponse status = authenticationService.registerUser(request);
        return ResponseEntity.ok(status);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginDto loginDto){
        AuthenticationResponse status = authenticationService.loginUser(loginDto);
        return ResponseEntity.ok(status);
    }
}
