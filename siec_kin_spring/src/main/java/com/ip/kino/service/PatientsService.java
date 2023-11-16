package com.ip.kino.service;

import com.ip.kino.repository.PatientsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ip.kino.model.Patients;

import java.util.List;

@Service
public class PatientsService {
    private final PatientsRepository patientsRepository;

    @Autowired
    public PatientsService(PatientsRepository patientsRepository) {
        this.patientsRepository = patientsRepository;
    }

    public List<Patients> getAllPatients(){
        return patientsRepository.findAll();
    }

    public Patients getPatientById(Long id){
        return patientsRepository.findById(id).orElse(null);
    }
}
