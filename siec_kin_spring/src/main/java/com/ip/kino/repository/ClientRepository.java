package com.ip.kino.repository;

import com.ip.kino.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ClientRepository extends JpaRepository<Client, Long> {
    @Query(value = "SELECT MAX(k.id_klienta) FROM klient k", nativeQuery = true)
    Long findMaxClientId();

//    Klient findByUzytkownik_id_uzytkownika(Long id_uzytkownika);
}
