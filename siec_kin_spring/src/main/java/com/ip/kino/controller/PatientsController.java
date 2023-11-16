package com.ip.kino.controller;

import com.ip.kino.model.Patients;
import com.ip.kino.service.PatientsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
//tak jakby folder, do którego mają się odnosić te funkcje w klasie
@RequestMapping("/")
public class PatientsController {
    private final PatientsService patientsService;
    @Autowired
    public PatientsController(PatientsService patientsService) {
        this.patientsService = patientsService;
    }

    //to moze byc albo nazwa widoku, albo kolejna część scieżki do widoku, w tym przypadku będzie to /allPatients.html
    @GetMapping("/allPatients")
    public String getAllPatients(Model model){
        List<Patients> patients = patientsService.getAllPatients();
        model.addAttribute("patients", patients);
        return "allPatients";
    }

    //to jest ścieżka w której wykorzystywana będzie ta funkcja i trzeba to tak podać, np szukam pacjenta o id 1: /patient/1
    @GetMapping("/patient{id}")
    public String getPatientById(@RequestParam Long id, Model model){
        Patients patient = patientsService.getPatientById(id);
        model.addAttribute("patient", patient);
        //zwracamy nazwę widoku, w którym ma być wykorzystywana ta funkcja
        return "patient";
    }
}
