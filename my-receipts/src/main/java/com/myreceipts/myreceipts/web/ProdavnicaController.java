package com.myreceipts.myreceipts.web;

import com.myreceipts.myreceipts.model.Prodavnica;
import com.myreceipts.myreceipts.service.ProdavnicaService;
import org.springframework.security.access.annotation.Secured;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/prodavnici", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "http://localhost:3000")
@Secured("ROLE_USER")
public class ProdavnicaController {

    private final ProdavnicaService prodavnicaService;

    public ProdavnicaController(ProdavnicaService prodavnicaService) {
        this.prodavnicaService = prodavnicaService;
    }

    @GetMapping
    List<Prodavnica> findAll() {
        return this.prodavnicaService.findAll();
    }

    @PostMapping
    Prodavnica createProdavnica(@RequestParam("ime") String ime,
                                @RequestParam("adresa") String adresa,
                                @RequestParam("idFirma") Integer idFirma,
                                @RequestParam("idGrad") Integer idGrad) {
        return this.prodavnicaService.createProdavnica(ime, adresa, idFirma, idGrad);
    }

}
