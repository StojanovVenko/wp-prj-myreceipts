package com.myreceipts.myreceipts.web;

import com.myreceipts.myreceipts.model.ProizvodNaSmetka;
import com.myreceipts.myreceipts.model.Smetka;
import com.myreceipts.myreceipts.model.vm.Page;
import com.myreceipts.myreceipts.service.SmetkaService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/smetki", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "http://localhost:3000")
public class SmetkaController {

    private final SmetkaService smetkaService;

    public SmetkaController(SmetkaService smetkaService) {
        this.smetkaService = smetkaService;
    }

//    @GetMapping
//    List<Object> findAll() {
//        return this.smetkiService.findAllDto();
//    }

    @PostMapping
    Smetka createSmetka(@RequestParam("datum") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date datum,
                        @RequestParam("idProdavnica") Integer idProdavnica,
                        @RequestParam("vkupnoPromet") Double vkupnoPromet,
                        @RequestParam("vkupnoDDV") Float vkupnoDDV,
                        @RequestParam(name = "danochenBroj", required = false) Optional<String> danochenBroj,
                        @RequestParam(name = "ddvBroj", required = false) Optional<String> ddvBroj ) {
        return this.smetkaService.createSmetka(datum, idProdavnica, vkupnoPromet,
                vkupnoDDV, danochenBroj, ddvBroj );
    }
    @GetMapping(path = "/{id}")
    List<ProizvodNaSmetka> getSmetkaWithProducts(@PathVariable Integer id) {
        return this.smetkaService.getSmetkaInfo(id);
    }

    @GetMapping
    public Page<Smetka> getSmetkiWithProducts(@RequestHeader(name = "page", defaultValue = "0", required = false) int page,
                                                @RequestHeader(name = "page-size", defaultValue = "10", required = false) int size) {
        return this.smetkaService.getSmetkiWithProducts(page, size);
    }
}