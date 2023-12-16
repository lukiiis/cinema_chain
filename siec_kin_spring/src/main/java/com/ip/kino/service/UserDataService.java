package com.ip.kino.service;

import com.ip.kino.dto.AdminDto;
import com.ip.kino.dto.KlientDto;
import com.ip.kino.dto.PracownikDto;
import com.ip.kino.dto.UserDataDto;
import com.ip.kino.model.Uzytkownik;
import com.ip.kino.repository.UzytkownikRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserDataService {
    private final UzytkownikRepository uzytkownikRepository;

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
}
