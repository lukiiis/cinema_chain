package com.ip.kino.service;

import com.ip.kino.dto.PracownikDTO;
import com.ip.kino.dto.UzytkownikDTO;
import com.ip.kino.model.*;
import com.ip.kino.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class RejestracjaService {
    @Autowired
    private UzytkownikRepository uzytkownikRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public Integer zarejestrujUzytkownika(UzytkownikDTO uzytkownikDTO) {
        //Sprawdzacz, czy istnieje w bazie uzytkownik o takim samym loginie lub emailu jak uzytkownik probujacy sie zarejestrowac
        List<Uzytkownik> listaUzytkownikow = uzytkownikRepository.findAll();
        for (Uzytkownik zarejestrowanyUzytkownik:listaUzytkownikow) {
            if(zarejestrowanyUzytkownik.getLogin().equals(uzytkownikDTO.getLogin()) && zarejestrowanyUzytkownik.getEmail().equals(uzytkownikDTO.getEmail())){
                return 3;
            }
            if(zarejestrowanyUzytkownik.getLogin().equals(uzytkownikDTO.getLogin())){
                //zwracam 1 i obsluguje w kontrolerze
                return 1;
            }
            if(zarejestrowanyUzytkownik.getEmail().equals(uzytkownikDTO.getEmail())){
                //zwracam 2 i obsluguje w kontrolerze
                return 2;
            }
            if(zarejestrowanyUzytkownik.getNr_telefonu() == uzytkownikDTO.getNr_telefonu()){
                return 4;
            }
            if(uzytkownikDTO.getLogin().equals("") || uzytkownikDTO.getEmail().equals("") ||
                    uzytkownikDTO.getImie().equals("") || uzytkownikDTO.getNazwisko().equals("") ||
                    uzytkownikDTO.getHaslo().equals("") || uzytkownikDTO.getNr_telefonu() == null){
                return 5;
            }
        }

        //ustawia id uzytkownika na najwyzsze w bazie + 1
        Long id_uzytkownika = uzytkownikRepository.findMaxIdUzytkownika();
        if(id_uzytkownika==null)
            id_uzytkownika = 1L;
        else
            id_uzytkownika += 1;

        Uzytkownik uzytkownik = new Uzytkownik(id_uzytkownika,uzytkownikDTO.getLogin(),passwordEncoder.encode(uzytkownikDTO.getHaslo()),
                                    uzytkownikDTO.getEmail(),uzytkownikDTO.getImie(),uzytkownikDTO.getNazwisko(),uzytkownikDTO.getNr_telefonu(),
                                    LocalDate.now(),0L, Role.USER);

        uzytkownikRepository.save(uzytkownik);
        return 0;
    }
}
