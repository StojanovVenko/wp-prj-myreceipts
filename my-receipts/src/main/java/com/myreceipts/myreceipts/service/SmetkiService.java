package com.myreceipts.myreceipts.service;

import com.myreceipts.myreceipts.model.ProizvodNaSmetka;
import com.myreceipts.myreceipts.model.Smetka;
import com.myreceipts.myreceipts.model.vm.Page;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface SmetkiService {

    Page<Smetka> getSmetkiWithProducts(Integer page, Integer size);


    List<Smetka> findAll();

    List<Object> findAllDto();

    List<ProizvodNaSmetka> getSmetkaInfo(Integer idSmetka);

    Smetka createSmetka(Date datum, Integer idProdavnica, Double vkupnoPromet, Float vkupnoDDV,
                        Optional<String> danochenBroj, Optional<String> ddvBroj);

}
