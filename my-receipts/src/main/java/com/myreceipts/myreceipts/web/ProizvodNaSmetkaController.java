package com.myreceipts.myreceipts.web;

import com.myreceipts.myreceipts.model.ProizvodNaSmetka;
import com.myreceipts.myreceipts.model.Smetka;
import com.myreceipts.myreceipts.model.dto.ProizvodiNaSmetkaRequest;
import com.myreceipts.myreceipts.model.vm.Page;
import com.myreceipts.myreceipts.security.CurrentUser;
import com.myreceipts.myreceipts.security.UserPrincipal;
import com.myreceipts.myreceipts.service.ProizvodNaSmetkaService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.annotation.Secured;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(path = "/api/proizvodi-na-smetki", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "http://localhost:3000")
@Secured("ROLE_USER")
public class ProizvodNaSmetkaController {

    private final ProizvodNaSmetkaService pnsService;

    public ProizvodNaSmetkaController(ProizvodNaSmetkaService pnsService) {
        this.pnsService = pnsService;
    }

    @GetMapping
    List<ProizvodNaSmetka> findAll() {
        return this.pnsService.findAll();
    }

    @PostMapping(path = "/update")
    ProizvodNaSmetka createProizvodNaSmetka(@RequestParam("idProizvod") Integer idProizvod,
                                            @RequestParam("idSmetka") Integer idSmetka,
                                            @RequestParam("cena") Float cena,
                                            @RequestParam("kolichina") Float kolichina) {
        return this.pnsService.dodadiProizvodNaSmetka(idProizvod, idSmetka, cena, kolichina);
    }

    @PostMapping
    ProizvodiNaSmetkaRequest dodadiProdukti(@RequestBody ProizvodiNaSmetkaRequest proizvodiNaSmetkaRequest){
        return this.pnsService.dodadiProizvodiNaSmetka(proizvodiNaSmetkaRequest);
    }

    @GetMapping(path = "/grad")
    public List<Object> t1(@CurrentUser UserPrincipal userPrincipal,
                           @RequestParam(name = "min_price") Double minPrice,
                           @RequestParam(name = "max_price") Double maxPrice,
                           @RequestParam(name = "start_date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
                           @RequestParam(name = "end_date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate,
                           @RequestParam(name = "id_grad") Integer idGrad){
        return this.pnsService.getStatsForProductsInCityForUser(userPrincipal.getId(), minPrice, maxPrice, startDate, endDate, idGrad);
    }

    @GetMapping(path = "/firma")
    public List<Object> t2(@CurrentUser UserPrincipal userPrincipal,
                     @RequestParam(name = "min_price") Double minPrice,
                     @RequestParam(name = "max_price") Double maxPrice,
                     @RequestParam(name = "start_date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
                     @RequestParam(name = "end_date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate,
                     @RequestParam(name = "id_firma") Integer idFirma){
        return this.pnsService.getStatsForProductsInFirmForUser(userPrincipal.getId(), minPrice, maxPrice, startDate, endDate, idFirma);
    }
    @GetMapping(path = "/prodavnica")
    public List<Object> t3(@CurrentUser UserPrincipal userPrincipal,
                     @RequestParam(name = "min_price") Double minPrice,
                     @RequestParam(name = "max_price") Double maxPrice,
                     @RequestParam(name = "start_date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
                     @RequestParam(name = "end_date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate,
                     @RequestParam(name = "id_prodavnica") Integer idProdavnica){
        return this.pnsService.getStatsForProductsInMarketForUser(userPrincipal.getId(), minPrice, maxPrice, startDate, endDate, idProdavnica);
    }

    @GetMapping(path = "/all")
    public List<Object> t4(@CurrentUser UserPrincipal userPrincipal,
                     @RequestParam(name = "min_price") Double minPrice,
                     @RequestParam(name = "max_price") Double maxPrice,
                     @RequestParam(name = "start_date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
                     @RequestParam(name = "end_date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate){
        return this.pnsService.getStatsForProductsForUser(userPrincipal.getId(), minPrice, maxPrice, startDate, endDate);
    }
}
