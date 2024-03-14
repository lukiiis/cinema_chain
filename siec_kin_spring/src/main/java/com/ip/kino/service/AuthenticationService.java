package com.ip.kino.service;

import com.ip.kino.config.*;
import com.ip.kino.dto.*;
import com.ip.kino.model.Client;
import com.ip.kino.model.Role;
import com.ip.kino.model.User;
import com.ip.kino.repository.ClientRepository;
import com.ip.kino.repository.UserRepository;
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
    private final UserRepository userRepository;
    private final ClientRepository clientRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse registerUser(RegisterDto request) {
        //Sprawdzacz, czy istnieje w bazie uzytkownik o takim samym loginie lub emailu jak uzytkownik probujacy sie zarejestrowac
        List<User> usersList = userRepository.findAll();
        for (User registeredUser:usersList) {
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
            if(registeredUser.getPhone() == request.getPhone()){
                return AuthenticationResponse.builder()
                        .status("Podany numer telefonu jest zajęty.")
                        .build();
            }
            if(request.getLogin().equals("") || request.getEmail().equals("") ||
                    request.getName().equals("") || request.getSurname().equals("") ||
                    request.getPasswd().equals("") || request.getPhone() == null){
                return AuthenticationResponse.builder()
                        .status("Pole w formularzu jest puste.")
                        .build();
            }
        }

        //ustawia id uzytkownika na najwyzsze w bazie + 1
        Long id_uzytkownika = userRepository.findMaxUserId();
        if(id_uzytkownika==null)
            id_uzytkownika = 1L;
        else
            id_uzytkownika += 1;

        User user = new User(id_uzytkownika,request.getLogin(),passwordEncoder.encode(request.getPasswd()),
                request.getEmail(),request.getName(),request.getSurname(),request.getPhone(),
                LocalDate.now(), Role.USER, null);

        userRepository.save(user);

        Long clientId = clientRepository.findMaxClientId();
        if(clientId == null)
            clientId = 1L;
        else
            clientId += 1;

        Client client = new Client(clientId,0L, 0.0, user); // Utwórz obiekt Klienta
        clientRepository.save(client); // Zapisz Klienta
        user.setClient(client);   //Ustawienie uzytkownikowi klienta

        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .status("Rejestracja przebiegła pomyślnie.")
                .name(user.getName())
                .lastName(user.getSurname())
                .token(jwtToken)
                .role(user.getRole())
                .build();
    }

    public AuthenticationResponse loginUser(LoginDto request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getLogin(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByLogin(request.getLogin())
                    .orElseThrow();

        if(user.getBlockade()){
            return new AuthenticationResponse("Account is blocked.");
        }

        var jwtToken = jwtService.generateToken(user);

        if(user.getRole() == Role.USER){
            return new AuthenticationResponseClient(
                    "Logowanie pomyslne, kliencie.",
                    jwtToken,
                    user.getName(),
                    user.getSurname(),
                    user.getRole(),
                    new ClientDto(
                            user.getClient().getClientId(),
                            user.getClient().getReservationCount(),
                            user.getClient().getWallet()));
        } else if (user.getRole() == Role.WORKER) {
            return new AuthenticationResponseWorker(
                    "Logowanie pomyslne, pracowniku.",
                    jwtToken,
                    user.getName(),
                    user.getSurname(),
                    user.getRole(),
                    new EmployeeDto(
                            user.getEmployee().getEmployeeId(),
                            user.getEmployee().getCinema(),
                            user.getEmployee().getPosition()));
        }
        return new AuthenticationResponseAdmin(
                "Logowanie pomyslne, adminie.",
                jwtToken,
                user.getName(),
                user.getSurname(),
                user.getRole(),
                new AdminDto(
                        user.getAdmin().getAdminId()));
    }
}
