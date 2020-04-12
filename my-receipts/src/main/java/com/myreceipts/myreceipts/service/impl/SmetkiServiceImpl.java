package com.myreceipts.myreceipts.service.impl;

import com.myreceipts.myreceipts.model.Prodavnica;
import com.myreceipts.myreceipts.model.ProizvodNaSmetka;
import com.myreceipts.myreceipts.model.Smetka;
import com.myreceipts.myreceipts.model.vm.Page;
import com.myreceipts.myreceipts.repository.PorizvodNaSmetkaRepository;
import com.myreceipts.myreceipts.repository.ProdavniciRepository;
import com.myreceipts.myreceipts.repository.SmetkiRepository;
import com.myreceipts.myreceipts.repository.jpa.JpaSmetkiRepository;
import com.myreceipts.myreceipts.service.SmetkiService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class SmetkiServiceImpl implements SmetkiService {

    private final JpaSmetkiRepository jpaSmetkiRepository;
    private final SmetkiRepository smetkiRepository;
    private final ProdavniciRepository prodavniciRepository;
    private final PorizvodNaSmetkaRepository proizvodiNaSmetkaRepository;

    public SmetkiServiceImpl(JpaSmetkiRepository jpaSmetkiRepository, SmetkiRepository smetkiRepository, ProdavniciRepository prodavniciRepository, PorizvodNaSmetkaRepository proizvodiNaSmetkaRepository) {
        this.jpaSmetkiRepository = jpaSmetkiRepository;
        this.smetkiRepository = smetkiRepository;
        this.prodavniciRepository = prodavniciRepository;
        this.proizvodiNaSmetkaRepository = proizvodiNaSmetkaRepository;
    }

    @Override
    public Page<Smetka> getSmetkiWithProducts(Integer page, Integer size) {
        return this.smetkiRepository.getAllSmetkiWithProducts(page, size);
    }

    @Override
    public List<Smetka> findAll() {
        return this.jpaSmetkiRepository.findAll();
    }

    @Override
    public List<Object> findAllDto() {
        return this.jpaSmetkiRepository.findAllDto();
    }

    @Override
    public List<ProizvodNaSmetka> getSmetkaInfo(Integer idSmetka) {
        return this.proizvodiNaSmetkaRepository.findAllBySmetka_IdSmetka(idSmetka);
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
        return this.jpaSmetkiRepository.save(smetka);
    }
}
