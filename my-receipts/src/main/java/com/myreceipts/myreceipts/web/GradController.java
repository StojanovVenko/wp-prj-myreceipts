package com.myreceipts.myreceipts.web;

import com.myreceipts.myreceipts.model.Grad;
import com.myreceipts.myreceipts.service.GradService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="/api/gradovi")
@CrossOrigin(origins = "http://localhost:3000")
public class GradController {
    private final GradService gradService;

    public GradController(GradService gradService) {
        this.gradService = gradService;
    }

    @GetMapping
    public List<Grad> findAll() {
        return this.gradService.getAllGradovi();
    }

    @PostMapping
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Grad createGrad(@RequestParam String imeGrad){
        return this.gradService.createGrad(imeGrad);
    }
}
