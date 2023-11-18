package com.ip.kino.repository;

import com.ip.kino.model.Uzytkownik;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UzytkownikRepository extends JpaRepository<Uzytkownik, Long> {
}
