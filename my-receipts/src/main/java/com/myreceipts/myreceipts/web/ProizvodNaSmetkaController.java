package com.myreceipts.myreceipts.web;

import com.myreceipts.myreceipts.model.ProizvodNaSmetka;
import com.myreceipts.myreceipts.model.dto.ProizvodiNaSmetkaRequest;
import com.myreceipts.myreceipts.service.ProizvodNaSmetkaService;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/dodadi-produkt", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "http://localhost:3000")
public class ProizvodNaSmetkaController {

    private final ProizvodNaSmetkaService proizvodNaSmetkaService;

    public ProizvodNaSmetkaController(ProizvodNaSmetkaService proizvodNaSmetkaService) {
        this.proizvodNaSmetkaService = proizvodNaSmetkaService;
    }

    @GetMapping
    List<ProizvodNaSmetka> findAll() {
        return this.proizvodNaSmetkaService.findAll();
    }

    @PostMapping(path = "/update")
    ProizvodNaSmetka createProizvodNaSmetka(@RequestParam("idProizvod") Integer idProizvod,
                                            @RequestParam("idSmetka") Integer idSmetka,
                                            @RequestParam("cena") Float cena,
                                            @RequestParam("kolichina") Float kolichina) {
        return this.proizvodNaSmetkaService.dodadiProizvodNaSmetka(idProizvod, idSmetka, cena, kolichina);
    }

    @PostMapping
    ProizvodiNaSmetkaRequest dodadiProdukti(@RequestBody ProizvodiNaSmetkaRequest proizvodiNaSmetkaRequest){
        return this.proizvodNaSmetkaService.dodadiProizvodiNaSmetka(proizvodiNaSmetkaRequest);
    }
}
