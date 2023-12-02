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
    private KlientRepository klientRepository;

    @Autowired
    private AdministratorRepository administratorRepository;

    @Autowired
    private PracownikRepository pracownikRepository;
    @Autowired
    private KinoRepository kinoRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    //ZROBIĆ ODDZIELNĄ REJESTRACJĘ DLA PRACOWNIKA, BO POTRZEBA TEŻ PRZESŁAĆ KINO
    public void zarejestrujPracownika(PracownikDTO pracownikDTO){
        Long id_uzytkownika = uzytkownikRepository.findMaxIdUzytkownika();
        if(id_uzytkownika==null)
            id_uzytkownika = 1L;
        else
            id_uzytkownika += 1;


        Long id_pracownika = pracownikRepository.findMaxIdPracownika();
        if(id_pracownika == null)
            id_pracownika = 1L;
        else
            id_pracownika += 1;
        Uzytkownik uzytkownik = pracownikDTO.getUzytkownik();
        Kino kino = pracownikDTO.getKino();
        String stanowisko = pracownikDTO.getStanowisko();
        Pracownik pracownik = new Pracownik(id_pracownika,stanowisko,uzytkownik,kino);
        uzytkownik.setTyp_konta(2L);
        uzytkownik.setId_uzytkownika(id_uzytkownika);
        uzytkownik.setAdministrator(null);
        uzytkownik.setPracownik(null);
        uzytkownik.setKlient(null);

        uzytkownikRepository.save(uzytkownik);

        pracownik.setUzytkownik(uzytkownik);
        pracownik.setKino(kino);
        pracownik.setStanowisko(stanowisko);
        pracownikRepository.save(pracownik);
        uzytkownik.setPracownik(pracownik);
        uzytkownikRepository.save(uzytkownik);

    }

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
                                    LocalDate.now(),0L,null,null,null);

        //trzeba go zapisać najpierw, żeby już był w bazie, żeby można było przypisać klientowi/pracownikowi/adminowi w klient.setUzytkownik(uzytkownik);
        uzytkownikRepository.save(uzytkownik);

        if (uzytkownik.getTyp_konta() == 0) {
            Long id_klienta = klientRepository.findMaxIdKlienta();
            if(id_klienta == null)
                id_klienta = 1L;
            else
                id_klienta += 1;

            Klient klient = new Klient(id_klienta,0L, 0.0, uzytkownik); // Utwórz obiekt Klienta
            klient.setUzytkownik(uzytkownik); // Ustaw powiązanie z użytkownikiem
            klientRepository.save(klient); // Zapisz Klienta
            uzytkownik.setKlient(klient);   //Ustawienie uzytkownikowi klienta
            uzytkownik.setTyp_konta(0L);    //Ustawienie typu konta 0-klient
        } //else if (uzytkownik.getTyp_konta() == 1) {
//            Long id_administratora = administratorRepository.findMaxIdAdministratora();
//            if(id_administratora == null)
//                id_administratora = 1L;
//            else
//                id_administratora += 1;
//
//            Administrator administrator = new Administrator(id_administratora, uzytkownik); // Utwórz obiekt Administratora
//            administrator.setUzytkownik(uzytkownik); // Ustaw powiązanie z użytkownikiem
//            administratorRepository.save(administrator); // Zapisz Administratora
//            uzytkownik.setAdministrator(administrator);
//        }
        uzytkownikRepository.save(uzytkownik);
        return 0;
    }
}
