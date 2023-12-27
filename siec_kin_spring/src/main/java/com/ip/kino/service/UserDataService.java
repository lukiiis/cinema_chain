package com.ip.kino.service;

import com.ip.kino.dto.*;
import com.ip.kino.model.Klient;
import com.ip.kino.model.Role;
import com.ip.kino.model.Uzytkownik;
import com.ip.kino.repository.AdministratorRepository;
import com.ip.kino.repository.KlientRepository;
import com.ip.kino.repository.PracownikRepository;
import com.ip.kino.repository.UzytkownikRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserDataService {
    private final PasswordEncoder passwordEncoder;
    private final UzytkownikRepository uzytkownikRepository;
    private final KlientRepository klientRepository;
    private final PracownikRepository pracownikRepository;
    private final AdministratorRepository administratorRepository;

    public UserDataDto getUserByLogin(String login){
        Uzytkownik user = uzytkownikRepository.findByLogin(login).orElseThrow();
        KlientDto klientDto = new KlientDto();
        AdminDto adminDto = new AdminDto();
        PracownikDto pracownikDto = new PracownikDto();
        if(user.getKlient() != null){
            klientDto.setId_klienta(user.getKlient().getId_klienta());
            klientDto.setPortfel(user.getKlient().getPortfel());
            klientDto.setLiczba_rezerwacji(user.getKlient().getLiczba_rezerwacji());
            adminDto=null;
            pracownikDto=null;
        } else if (user.getAdministrator() != null) {
            adminDto.setId_administratora(user.getAdministrator().getId_administratora());
            pracownikDto = null;
            klientDto=null;
        } else if (user.getPracownik() != null) {
            pracownikDto.setId_pracownika(user.getPracownik().getId_pracownika());
            pracownikDto.setStanowisko(user.getPracownik().getStanowisko());
            pracownikDto.setKino(user.getPracownik().getKino());
            klientDto = null;
            adminDto=null;
        }
        return new UserDataDto(
                    user.getId_uzytkownika(),
                    user.getLogin(),
                    user.getEmail(),
                    user.getImie(),
                    user.getNazwisko(),
                    user.getNr_telefonu(),
                    user.getData_utworzenia(),
                    user.getRole(),
                    klientDto,
                    adminDto,
                    pracownikDto

            );
    }

    public List<Uzytkownik> getAllUsers() {
        return uzytkownikRepository.findAll();
    }

    public String blockOrUnblockAccount(Long id) {
        Uzytkownik user = uzytkownikRepository.findByIdUzytkownika(id).orElseThrow();
        if(user.getBlokada()){
            user.setBlokada(false);
            uzytkownikRepository.save(user);
            return "User has been unblocked.";
        }
        user.setBlokada(true);
        uzytkownikRepository.save(user);
        return "User has been blocked.";
    }

    public String deleteAccount(Long id) {
        try {
//            uzytkownikRepository.deleteUser(id);
            Uzytkownik user = uzytkownikRepository.findByIdUzytkownika(id).orElseThrow();
            System.out.println(user.getId_uzytkownika());
            uzytkownikRepository.delete(user);
            return "Account has been deleted.";
        } catch (Exception ex) {
            // Obsługa ewentualnych błędów
            ex.printStackTrace();
            return "Error deleting account.";
        }
    }

    public Object changePassword(ChangePasswordDto passwordData) {
        try{
            Uzytkownik user = uzytkownikRepository.findByIdUzytkownika(passwordData.getId()).orElseThrow();
            if(!passwordEncoder.matches(passwordData.getOldPassword(), user.getPassword())){
                return "Old password does not match with current one";
            }
            String encodedNewPassword = passwordEncoder.encode(passwordData.getNewPassword());
            user.setHaslo(encodedNewPassword);

            uzytkownikRepository.save(user);
            return "Password successfully changed";
        }
        catch (Exception ex){
            ex.printStackTrace();
            return "Error changing password.";
        }
    }

//    public String changeRole(Long id, String role) {
//        Uzytkownik user = uzytkownikRepository.findByIdUzytkownika(id).orElseThrow();
//        if(user.getRole().toString().equals(role)){
//            return "User already has that role.";
//        }
//
//        if(user.getRole() == Role.USER){
//            Klient klient = user.getKlient();
//            if(role.equals("ADMIN")){
//
//            }
//        }
//    }
}
