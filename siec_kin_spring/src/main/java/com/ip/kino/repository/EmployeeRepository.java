package com.ip.kino.repository;

import com.ip.kino.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    @Query(value = "SELECT MAX(p.id_pracownika) FROM pracownik p", nativeQuery = true)
    Long findMaxEmployeeId();
}
