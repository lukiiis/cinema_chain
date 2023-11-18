package com.ip.kino.repository;

import com.ip.kino.model.Zapowiedzi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ZapowiedziRepository extends JpaRepository<Zapowiedzi, Long> {

}
