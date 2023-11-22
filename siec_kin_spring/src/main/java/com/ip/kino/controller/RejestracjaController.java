package com.ip.kino.controller;

import com.ip.kino.dto.PracownikDTO;
import com.ip.kino.dto.UzytkownikDTO;
import com.ip.kino.model.Kino;
import com.ip.kino.model.Uzytkownik;
import com.ip.kino.service.RejestracjaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/register")
public class RejestracjaController {
    private final RejestracjaService rejestracjaService;

    public RejestracjaController(RejestracjaService rejestracjaService) {
        this.rejestracjaService = rejestracjaService;
    }
    @PostMapping("/uzytkownik")
    public ResponseEntity<String> zarejestrujUzytkownika(@RequestBody UzytkownikDTO uzytkownikDTO){
        Integer status = rejestracjaService.zarejestrujUzytkownika(uzytkownikDTO);
        if(status == 0)
            return ResponseEntity.ok("Użytkownik został pomyślnie zarejestrowany.");
        else if(status == 1){
            return ResponseEntity.ok("Podany login jest zajęty.");
        }
        else if(status == 2){
            return ResponseEntity.ok("Podany adres e-mail jest zajęty.");
        }
        else if(status == 3){
            return ResponseEntity.ok("Podany adres e-mail oraz login są zajęte.");
        }
        else if(status == 4){
            return ResponseEntity.ok("Podany numer telefonu jest zajęty.");
        }
        return (ResponseEntity<String>) ResponseEntity.internalServerError();
    }

    //ZROBIĆ REJESTRACJĘ DLA PRACOWNIKA INNĄ TU I W SERWISIE, BO POTRZEBA TEŻ PRZESŁAĆ W PARAMETRZE OBIEKT KINA LUB ID KINA oraz STANOWISKO
    @PostMapping("/pracownik")
    public ResponseEntity<String> zarejestrujPracownika(@RequestBody PracownikDTO pracownikDTO){
        rejestracjaService.zarejestrujPracownika(pracownikDTO);
        return ResponseEntity.ok("Pracownik został pomyślnie zarejestrowany.");
    }
}
