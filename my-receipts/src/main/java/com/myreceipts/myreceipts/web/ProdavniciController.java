package com.myreceipts.myreceipts.web;

import com.myreceipts.myreceipts.model.Prodavnica;
import com.myreceipts.myreceipts.service.ProdavniciService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/prodavnici")
@CrossOrigin(origins = "http://localhost:3000")
public class ProdavniciController {

    private final ProdavniciService prodavniciService;

    public ProdavniciController(ProdavniciService prodavniciService) {
        this.prodavniciService = prodavniciService;
    }

    @GetMapping
    List<Prodavnica> findAll() {
        return this.prodavniciService.findAll();
    }

    @PostMapping
    Prodavnica createProdavnica(@RequestParam("ime") String ime,
                                @RequestParam("adresa") String adresa,
                                @RequestParam("idFirma") Integer idFirma,
                                @RequestParam("idGrad") Integer idGrad) {
        return this.prodavniciService.createProdavnica(ime, adresa, idFirma, idGrad);
    }

}
