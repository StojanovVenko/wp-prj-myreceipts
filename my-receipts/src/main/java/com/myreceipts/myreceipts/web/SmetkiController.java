package com.myreceipts.myreceipts.web;

import com.myreceipts.myreceipts.model.Smetka;
import com.myreceipts.myreceipts.service.SmetkiService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/smetki")
public class SmetkiController {

    private final SmetkiService smetkiService;

    public SmetkiController(SmetkiService smetkiService) {
        this.smetkiService = smetkiService;
    }

    @GetMapping
    List<Smetka> findAll() {
        return this.smetkiService.findAll();
    }

    @PostMapping
    Smetka createSmetka(@RequestParam("datum") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date datum,
                        @RequestParam("idProdavnica") Integer idProdavnica,
                        @RequestParam("vkupnoPromet") Double vkupnoPromet,
                        @RequestParam("vkupnoDDV") Float vkupnoDDV,
                        @RequestParam(name = "danochenBroj", required = false) Optional<String> danochenBroj,
                        @RequestParam(name = "ddvBroj", required = false) Optional<String> ddvBroj ) {
        return this.smetkiService.createSmetka(datum, idProdavnica, vkupnoPromet,
                vkupnoDDV, danochenBroj, ddvBroj );
    }
}
