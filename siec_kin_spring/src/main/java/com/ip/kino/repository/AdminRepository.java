package com.ip.kino.repository;

import com.ip.kino.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    @Query(value = "SELECT MAX(a.id_administratora) FROM administrator a", nativeQuery = true)
    Long findMaxAdminId();
}
