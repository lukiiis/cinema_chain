package com.ip.kino.repository;

import com.ip.kino.model.Aktualnosci;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AktualnosciRepository extends JpaRepository<Aktualnosci, Long> {
}
