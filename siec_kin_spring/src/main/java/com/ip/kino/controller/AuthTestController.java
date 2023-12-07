package com.ip.kino.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v2")
public class AuthTestController {
    @GetMapping("/test")
    public ResponseEntity<String> authTest(){
        return ResponseEntity.ok("dziala kurwa authentication");
    }
}
