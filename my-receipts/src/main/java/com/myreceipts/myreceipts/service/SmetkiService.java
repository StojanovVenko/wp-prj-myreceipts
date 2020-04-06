package com.myreceipts.myreceipts.service;

import com.myreceipts.myreceipts.model.Smetka;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface SmetkiService {

    List<Smetka> findAll();

    Smetka createSmetka(Date datum, Integer idProdavnica, Double vkupnoPromet, Float vkupnoDDV,
                        Optional<String> danochenBroj, Optional<String> ddvBroj);

}
