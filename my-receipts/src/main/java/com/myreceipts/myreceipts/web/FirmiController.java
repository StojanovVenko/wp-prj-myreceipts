package com.myreceipts.myreceipts.web;

import com.myreceipts.myreceipts.model.Firma;
import com.myreceipts.myreceipts.service.FirmiService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/firmi")
@CrossOrigin(origins = "http://localhost:3000")
public class FirmiController {

    private final FirmiService firmiService;

    public FirmiController(FirmiService firmiService) {
        this.firmiService = firmiService;
    }

    @GetMapping
    public List<Firma> findAll() {
        return this.firmiService.findAll();
    }

    @PostMapping
    public Firma createFirma(@RequestParam("ime") String ime,
                             @RequestParam("adresa") String adresa,
                             @RequestParam("idGrad") Integer idGrad) {
        return this.firmiService.createFirma(ime, adresa, idGrad);
    }

}
