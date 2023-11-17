package com.ip.kino.repository;

import com.ip.kino.model.Zapowiedz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ZapowiedzRepository extends JpaRepository<Zapowiedz, Long> {

}
