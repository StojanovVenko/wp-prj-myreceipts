package com.myreceipts.myreceipts.web;

import com.myreceipts.myreceipts.model.Firma;
import com.myreceipts.myreceipts.service.FirmaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/firmi")
@CrossOrigin(origins = "http://localhost:3000")
public class FirmaController {

    private final FirmaService firmaService;

    public FirmaController(FirmaService firmaService) {
        this.firmaService = firmaService;
    }

    @GetMapping
    public List<Firma> findAll() {
        return this.firmaService.findAll();
    }

    @PostMapping
    public Firma createFirma(@RequestParam("ime") String ime,
                             @RequestParam("adresa") String adresa,
                             @RequestParam("idGrad") Integer idGrad) {
        return this.firmaService.createFirma(ime, adresa, idGrad);
    }

}
