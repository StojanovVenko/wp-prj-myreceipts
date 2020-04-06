package com.myreceipts.myreceipts.web;

import com.myreceipts.myreceipts.model.ProizvodNaSmetka;
import com.myreceipts.myreceipts.service.ProizvodNaSmetkaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("dodadi-produkt")
public class ProizvodNaSmetkaController {

    private final ProizvodNaSmetkaService proizvodNaSmetkaService;

    public ProizvodNaSmetkaController(ProizvodNaSmetkaService proizvodNaSmetkaService) {
        this.proizvodNaSmetkaService = proizvodNaSmetkaService;
    }

    @GetMapping
    List<ProizvodNaSmetka> findAll() {
        return this.proizvodNaSmetkaService.findAll();
    }

    @PostMapping
    ProizvodNaSmetka createProizvodNaSmetka(@RequestParam("idProizvod") Integer idProizvod,
                                            @RequestParam("idSmetka") Integer idSmetka,
                                            @RequestParam("cena") Float cena,
                                            @RequestParam("kolichina") Float kolichina) {
        return this.proizvodNaSmetkaService.dodadiProizvodNaSmetka(idProizvod, idSmetka, cena, kolichina);
    }
}