package com.myreceipts.myreceipts.web;

import com.myreceipts.myreceipts.model.ProizvodNaSmetka;
import com.myreceipts.myreceipts.model.Smetka;
import com.myreceipts.myreceipts.model.dto.UserMinMaxSmetkDTO;
import com.myreceipts.myreceipts.model.vm.Constants;
import com.myreceipts.myreceipts.model.vm.Page;
import com.myreceipts.myreceipts.security.CurrentUser;
import com.myreceipts.myreceipts.security.UserPrincipal;
import com.myreceipts.myreceipts.service.SmetkaService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.annotation.Secured;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/smetki", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "http://localhost:3000")
@Secured("ROLE_USER")
public class SmetkaController {

    private final SmetkaService smetkaService;

    public SmetkaController(SmetkaService smetkaService) {
        this.smetkaService = smetkaService;
    }

    @PostMapping
    Smetka createSmetka(@CurrentUser UserPrincipal userPrincipal,
                        @RequestParam("datum") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date datum,
                        @RequestParam("idProdavnica") Integer idProdavnica,
                        @RequestParam("vkupnoPromet") Double vkupnoPromet,
                        @RequestParam("vkupnoDDV") Float vkupnoDDV,
                        @RequestParam(name = "danochenBroj", required = false) Optional<String> danochenBroj,
                        @RequestParam(name = "ddvBroj", required = false) Optional<String> ddvBroj ) {
        return this.smetkaService.createSmetka(userPrincipal.getId().longValue(), datum, idProdavnica, vkupnoPromet,
                vkupnoDDV, danochenBroj, ddvBroj );
    }
    @GetMapping(path = "/{id}")
    List<ProizvodNaSmetka> getSmetkaWithProducts(@CurrentUser UserPrincipal userPrincipal,
                                                 @PathVariable Integer id) {
        return this.smetkaService.getSmetkaInfo(userPrincipal.getId().longValue(), id);
    }

    @GetMapping(path = "/all")
    public Page<Smetka> getSmetkiWithProducts(@CurrentUser UserPrincipal userPrincipal,
                                              @RequestHeader(name = "page", defaultValue = "0", required = false) int page,
                                              @RequestHeader(name = "page-size", defaultValue = "10", required = false) int size) {
        return this.smetkaService.getSmetkiWithProducts(userPrincipal.getId().longValue(), page, size);
    }

    @GetMapping
    public Page<Smetka> getSmetkiWithProductsFiltered(@CurrentUser UserPrincipal userPrincipal,
                                                      @RequestHeader(name = "page", defaultValue = "0", required = false) int page,
                                                      @RequestHeader(name = "page-size", defaultValue = "10", required = false) int size,
                                                      @RequestParam(name = "gr", required = false) int idGrad,
                                                      @RequestParam(name = "pr", required = false) int idProdavnica,
                                                      @RequestParam(name = "sp", required = false) Double startPrice,
                                                      @RequestParam(name = "ep", required = false) Double endPrice,
                                                      @RequestParam(name = "sd", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
                                                      @RequestParam(name = "ed", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate) {


        return this.smetkaService.getSmetkiWithProductsFiltered(userPrincipal.getId().longValue(), page, size, idGrad,
                idProdavnica, startPrice, endPrice, startDate, endDate);
    }

    @GetMapping(path = "/user/min-max")
    public Object getMinMaxForUser(@CurrentUser UserPrincipal userPrincipal){
        return this.smetkaService.getMinMaxForUser(userPrincipal.getId());
    }

    @GetMapping(path = "/last-seven-days")
    public List<Double> getPoslednaNedelaCeni(@CurrentUser UserPrincipal userPrincipal) {
        return this.smetkaService.getPoslednaNedelaCeni(userPrincipal.getId());
    }

}
