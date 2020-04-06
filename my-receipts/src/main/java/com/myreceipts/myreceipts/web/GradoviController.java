package com.myreceipts.myreceipts.web;

import com.myreceipts.myreceipts.model.Grad;
import com.myreceipts.myreceipts.service.GradoviService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="/gradovi")
//@CrossOrigin(origins = "http://localhost:3000")
public class GradoviController {
    private final GradoviService gradoviService;

    public GradoviController(GradoviService gradoviService) {
        this.gradoviService = gradoviService;
    }

    @GetMapping
    public List<Grad> findAll() {
        return this.gradoviService.getAllGradovi();
    }

    @PostMapping
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Grad createGrad(@RequestParam String imeGrad){
        return this.gradoviService.createGrad(imeGrad);
    }
}
