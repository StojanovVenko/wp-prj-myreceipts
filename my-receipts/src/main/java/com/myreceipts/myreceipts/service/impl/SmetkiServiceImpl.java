package com.myreceipts.myreceipts.service.impl;

import com.myreceipts.myreceipts.model.Prodavnica;
import com.myreceipts.myreceipts.model.Smetka;
import com.myreceipts.myreceipts.repository.ProdavniciRepository;
import com.myreceipts.myreceipts.repository.SmetkiRepository;
import com.myreceipts.myreceipts.service.SmetkiService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class SmetkiServiceImpl implements SmetkiService {

    private final SmetkiRepository smetkiRepository;
    private final ProdavniciRepository prodavniciRepository;

    public SmetkiServiceImpl(SmetkiRepository smetkiRepository, ProdavniciRepository prodavniciRepository) {
        this.smetkiRepository = smetkiRepository;
        this.prodavniciRepository = prodavniciRepository;
    }

    @Override
    public List<Smetka> findAll() {
        return this.smetkiRepository.findAll();
    }

    @Override
    public Smetka createSmetka(Date datum, Integer idProdavnica, Double vkupnoPromet, Float vkupnoDDV,
                               Optional<String> danochenBroj, Optional<String> ddvBroj) {
        Prodavnica prodavnica = this.prodavniciRepository.findById(idProdavnica)
                .orElseThrow(() -> new NoSuchElementException("Ne postoi prodavnica so id: " + idProdavnica));

        Smetka smetka = new Smetka();
        smetka.setDatum(datum);
        smetka.setPregledana(0);
        smetka.setProdavnica(prodavnica);
        smetka.setVkupenPromet(vkupnoPromet);
        smetka.setVkupnoDDV(vkupnoDDV);
        if(ddvBroj.isPresent())
            smetka.setDdvBroj(ddvBroj.get());
        if(danochenBroj.isPresent())
            smetka.setDanochenBroj(danochenBroj.get());
        return this.smetkiRepository.save(smetka);
    }
}
