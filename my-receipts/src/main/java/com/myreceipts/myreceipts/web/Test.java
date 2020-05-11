package com.myreceipts.myreceipts.web;

import com.myreceipts.myreceipts.model.Smetka;
import com.myreceipts.myreceipts.model.vm.Page;
import com.myreceipts.myreceipts.repository.SmetkaRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping(path = "/api/test", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)

public class Test {

    public final SmetkaRepository repository;

    public Test(SmetkaRepository repository) {
        this.repository = repository;
    }


    @GetMapping(path = "/1")
    public Page<Smetka> getSmetkiWithProductsFiltered(@RequestHeader(name = "page", defaultValue = "0", required = false) int page,
                                                      @RequestHeader(name = "page-size", defaultValue = "10", required = false) int size,
                                                      @RequestParam(name = "gr", required = false) int idGrad,
                                                      @RequestParam(name = "pr", required = false) int idProdavnica,
                                                      @RequestParam(name = "sp", required = false) Double startPrice,
                                                      @RequestParam(name = "ep", required = false) Double endPrice,
                                                      @RequestParam(name = "sd", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
                                                      @RequestParam(name = "ed", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate) {
        return this.repository.findAllSmetkiWithProductsFiltered(page, size, idGrad, startPrice, endPrice, startDate, endDate);
    }


}
