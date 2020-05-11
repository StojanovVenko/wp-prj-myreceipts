package com.myreceipts.myreceipts.web;

import com.myreceipts.myreceipts.model.Firma;
import com.myreceipts.myreceipts.model.Prodavnica;
import com.myreceipts.myreceipts.model.Smetka;
import com.myreceipts.myreceipts.model.vm.Page;
import com.myreceipts.myreceipts.service.FirmaService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/firmi", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
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

    @GetMapping(path = "/{idFirma}")
    public Optional<Firma> findById(@PathVariable(name = "idFirma") int idFirma) {
        return this.firmaService.findById(idFirma);
    }

    @PostMapping
    public Firma createFirma(@RequestParam("ime") String ime,
                             @RequestParam("adresa") String adresa,
                             @RequestParam("idGrad") Integer idGrad) {
        return this.firmaService.createFirma(ime, adresa, idGrad);
    }

    @GetMapping(path = "/{idFirma}/smetki")
    public Page<Smetka> findAllOdFirma(@RequestHeader(name = "page", defaultValue = "0", required = false) int page,
                                       @RequestHeader(name = "page-size", defaultValue = "10", required = false) int size,
                                       @PathVariable(name = "idFirma") int idFirma,
                                       @RequestParam(name = "pr", required = false) int idProdavnica,
                                       @RequestParam(name = "sp", required = false) Double startPrice,
                                       @RequestParam(name = "ep", required = false) Double endPrice,
                                       @RequestParam(name = "sd", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
                                       @RequestParam(name = "ed", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate) {
        return this.firmaService.findAllSmetkiInFirma(page, size, idFirma, idProdavnica, startPrice, endPrice, startDate, endDate);
    }

    @GetMapping(path = "/{idFirma}/prodavnici")
    public List<Prodavnica> getAllProdavniciVoFirma(@PathVariable(name = "idFirma") Integer idFirma) {
        return this.firmaService.getAllProdavnici(idFirma);
    }

    }
