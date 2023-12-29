package com.ip.kino.controller;

import com.ip.kino.dto.ChangePasswordDto;
import com.ip.kino.dto.ChangePersonalDataDto;
import com.ip.kino.dto.UserDataDto;
import com.ip.kino.model.User;
import com.ip.kino.service.UserDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/private")
public class UserDataController {
    private final UserDataService userDataService;
    @GetMapping("/userdetails/{login}")
    ResponseEntity<UserDataDto> getUserByLogin(@PathVariable String login){
        return ResponseEntity.ok(userDataService.getUserByLogin(login));
    }
    @GetMapping("/userdetails")
    ResponseEntity<List<User>> getAllUsers(){
        return ResponseEntity.ok(userDataService.getAllUsers());
    }

//    @PostMapping("/change-role/{id}/{role}")
//    ResponseEntity<String> changeRole(@PathVariable Long id, @PathVariable String role){
//        String status = userDataService.changeRole(id, role);
//        return ResponseEntity.ok(status);
//    }

    @PostMapping("/block-unblock/{id}")
    ResponseEntity<String> blockOrUnblockAccount(@PathVariable Long id){
        String status = userDataService.blockOrUnblockAccount(id);
        return ResponseEntity.ok(status);
    }

    @PostMapping("/delete-account")
    public ResponseEntity<String> deleteAccount(@RequestParam("id") Long id){
        return ResponseEntity.ok(userDataService.deleteAccount(id));
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordDto changePasswordDto){
        return ResponseEntity.ok(userDataService.changePassword(changePasswordDto));
    }

    @PostMapping("/change-personal-data")
    public ResponseEntity<?> changePersonalData(@RequestBody ChangePersonalDataDto changePersonalDataDto){
        return ResponseEntity.ok(userDataService.changePersonalData(changePersonalDataDto));
    }
}
