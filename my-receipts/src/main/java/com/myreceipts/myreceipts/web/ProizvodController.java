package com.myreceipts.myreceipts.web;

import com.myreceipts.myreceipts.model.Proizvod;
import com.myreceipts.myreceipts.service.ProizvodService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/proizvodi")
@CrossOrigin(origins = "http://localhost:3000")
public class ProizvodController {

    private final ProizvodService proizvodService;

    public ProizvodController(ProizvodService proizvodService) {
        this.proizvodService = proizvodService;
    }

    @GetMapping
    List<Proizvod> findAll() {
        return this.proizvodService.findAll();
    }

    @PostMapping
    Proizvod createProizvod(@RequestParam("imeProizvod") String imeProizvod) {
        return this.proizvodService.createProizvod(imeProizvod);
    }

}
