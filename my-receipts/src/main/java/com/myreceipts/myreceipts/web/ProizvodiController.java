package com.myreceipts.myreceipts.web;

import com.myreceipts.myreceipts.model.Proizvod;
import com.myreceipts.myreceipts.service.ProizvodiService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/proizvodi")
public class ProizvodiController {

    private final ProizvodiService proizvodiService;

    public ProizvodiController(ProizvodiService proizvodiService) {
        this.proizvodiService = proizvodiService;
    }

    @GetMapping
    List<Proizvod> findAll() {
        return this.proizvodiService.findAll();
    }

    @PostMapping
    Proizvod createProizvod(@RequestParam("imeProizvod") String imeProizvod) {
        return this.proizvodiService.createProizvod(imeProizvod);
    }

}
