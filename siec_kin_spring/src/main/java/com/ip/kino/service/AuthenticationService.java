package com.ip.kino.service;

import com.ip.kino.config.*;
import com.ip.kino.dto.*;
import com.ip.kino.model.Klient;
import com.ip.kino.model.Role;
import com.ip.kino.model.Uzytkownik;
import com.ip.kino.repository.KlientRepository;
import com.ip.kino.repository.UzytkownikRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UzytkownikRepository uzytkownikRepository;
    private final KlientRepository klientRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse registerUser(UzytkownikDTO request) {
        //Sprawdzacz, czy istnieje w bazie uzytkownik o takim samym loginie lub emailu jak uzytkownik probujacy sie zarejestrowac
        List<Uzytkownik> usersList = uzytkownikRepository.findAll();
        for (Uzytkownik registeredUser:usersList) {
            if(registeredUser.getLogin().equals(request.getLogin()) && registeredUser.getEmail().equals(request.getEmail())){
                return AuthenticationResponse.builder()
                        .status("Podany adres e-mail oraz login są zajęte.")
                        .build();
            }
            if(registeredUser.getLogin().equals(request.getLogin())){
                //zwracam 1 i obsluguje w kontrolerze
                return AuthenticationResponse.builder()
                        .status("Podany login jest zajęty.")
                        .build();
            }
            if(registeredUser.getEmail().equals(request.getEmail())){
                //zwracam 2 i obsluguje w kontrolerze
                return AuthenticationResponse.builder()
                        .status("Podany adres e-mail jest zajęty.")
                        .build();
            }
            if(registeredUser.getNr_telefonu() == request.getNr_telefonu()){
                return AuthenticationResponse.builder()
                        .status("Podany numer telefonu jest zajęty.")
                        .build();
            }
            if(request.getLogin().equals("") || request.getEmail().equals("") ||
                    request.getImie().equals("") || request.getNazwisko().equals("") ||
                    request.getHaslo().equals("") || request.getNr_telefonu() == null){
                return AuthenticationResponse.builder()
                        .status("Pole w formularzu jest puste.")
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
                LocalDate.now(), Role.USER, null);

        uzytkownikRepository.save(uzytkownik);

        Long id_klienta = klientRepository.findMaxIdKlienta();
        if(id_klienta == null)
            id_klienta = 1L;
        else
            id_klienta += 1;

        Klient klient = new Klient(id_klienta,0L, 0.0, uzytkownik); // Utwórz obiekt Klienta
        klientRepository.save(klient); // Zapisz Klienta
        uzytkownik.setKlient(klient);   //Ustawienie uzytkownikowi klienta

        uzytkownikRepository.save(uzytkownik);
        var jwtToken = jwtService.generateToken(uzytkownik);
        return AuthenticationResponse.builder()
                .status("Rejestracja przebiegła pomyślnie.")
                .name(uzytkownik.getImie())
                .lastName(uzytkownik.getNazwisko())
                .token(jwtToken)
                .role(uzytkownik.getRole())
                .build();
    }

    public AuthenticationResponse loginUser(LoginDto request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getLogin(),
                        request.getPassword()
                )
        );
        var user = uzytkownikRepository.findByLogin(request.getLogin())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);

        if(user.getRole() == Role.USER){
            return new AuthenticationResponseClient(
                    "Logowanie pomyslne, kliencie.",
                    jwtToken,
                    user.getImie(),
                    user.getNazwisko(),
                    user.getRole(),
                    new KlientDto(user.getKlient().getId_klienta(),
                            user.getKlient().getLiczba_rezerwacji(),
                            user.getKlient().getPortfel()));
        } else if (user.getRole() == Role.WORKER) {
            return new AuthenticationResponseWorker(
                    "Logowanie pomyslne, pracowniku.",
                    jwtToken,
                    user.getImie(),
                    user.getNazwisko(),
                    user.getRole(),
                    new PracownikDto(user.getPracownik().getId_pracownika(),
                            user.getPracownik().getKino(),
                            user.getPracownik().getStanowisko()));
        }

        return new AuthenticationResponseAdmin(
                "Logowanie pomyslne, adminie.",
                jwtToken,
                user.getImie(),
                user.getNazwisko(),
                user.getRole(),
                new AdminDto(user.getAdministrator().getId_administratora()));
    }
}
