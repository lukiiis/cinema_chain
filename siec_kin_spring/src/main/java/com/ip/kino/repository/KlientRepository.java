package com.ip.kino.repository;

import com.ip.kino.model.Klient;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface KlientRepository extends JpaRepository<Klient, Long> {
    @Query(value = "SELECT MAX(k.id_klienta) FROM klient k", nativeQuery = true)
    Long findMaxIdKlienta();

//    Klient findByUzytkownik_id_uzytkownika(Long id_uzytkownika);
}
