package com.ip.kino.service;

import com.ip.kino.config.AuthenticationResponse;
import com.ip.kino.config.JwtService;
import com.ip.kino.dto.LoginDto;
import com.ip.kino.dto.UzytkownikDTO;
import com.ip.kino.model.Role;
import com.ip.kino.model.Uzytkownik;
import com.ip.kino.repository.UzytkownikRepository;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
@Service
@RequiredArgsConstructor
public class AuthenticationService {
    @Autowired
    private UzytkownikRepository uzytkownikRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private final JwtService jwtService;
    @Autowired
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse registerUser(UzytkownikDTO request) {
        //Sprawdzacz, czy istnieje w bazie uzytkownik o takim samym loginie lub emailu jak uzytkownik probujacy sie zarejestrowac
        List<Uzytkownik> usersList = uzytkownikRepository.findAll();
        for (Uzytkownik registeredUser:usersList) {
            if(registeredUser.getLogin().equals(request.getLogin()) && registeredUser.getEmail().equals(request.getEmail())){
                return AuthenticationResponse.builder()
                        .status("Podany adres e-mail oraz login są zajęte.")
                        .name(null)
                        .lastName(null)
                        .token(null)
                        .build();
            }
            if(registeredUser.getLogin().equals(request.getLogin())){
                //zwracam 1 i obsluguje w kontrolerze
                return AuthenticationResponse.builder()
                        .status("Podany login jest zajęty.")
                        .name(null)
                        .lastName(null)
                        .token(null)
                        .build();
            }
            if(registeredUser.getEmail().equals(request.getEmail())){
                //zwracam 2 i obsluguje w kontrolerze
                return AuthenticationResponse.builder()
                        .status("Podany adres e-mail jest zajęty.")
                        .name(null)
                        .lastName(null)
                        .token(null)
                        .build();
            }
            if(registeredUser.getNr_telefonu() == request.getNr_telefonu()){
                return AuthenticationResponse.builder()
                        .status("Podany numer telefonu jest zajęty.")
                        .name(null)
                        .lastName(null)
                        .token(null)
                        .build();
            }
            if(request.getLogin().equals("") || request.getEmail().equals("") ||
                    request.getImie().equals("") || request.getNazwisko().equals("") ||
                    request.getHaslo().equals("") || request.getNr_telefonu() == null){
                return AuthenticationResponse.builder()
                        .status("Pole w formularzu jest puste.")
                        .name(null)
                        .lastName(null)
                        .token(null)
                        .build();
            }
        }

        //ustawia id uzytkownika na najwyzsze w bazie + 1
        Long id_uzytkownika = uzytkownikRepository.findMaxIdUzytkownika();
        if(id_uzytkownika==null)
            id_uzytkownika = 1L;
        else
            id_uzytkownika += 1;

        Uzytkownik uzytkownik = new Uzytkownik(id_uzytkownika,request.getLogin(),passwordEncoder.encode(request.getHaslo()),
                request.getEmail(),request.getImie(),request.getNazwisko(),request.getNr_telefonu(),
                LocalDate.now(),0L, Role.USER);

        uzytkownikRepository.save(uzytkownik);
        var jwtToken = jwtService.generateToken(uzytkownik);
        return AuthenticationResponse.builder()
                .status("Użytkownik został pomyślnie zarejestrowany.")
                .name(uzytkownik.getImie())
                .lastName(uzytkownik.getNazwisko())
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse loginUser(LoginDto request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getLogin(),
                        request.getHaslo()
                )
        );
        var user = uzytkownikRepository.findByLogin(request.getLogin())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .status("Logowanie pomyslne.")
                .name(user.getImie())
                .lastName(user.getNazwisko())
                .role(user.getRole())
                .build();
    }
}
