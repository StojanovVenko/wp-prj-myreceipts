package com.myreceipts.myreceipts.service.impl;

import com.myreceipts.myreceipts.model.Prodavnica;
import com.myreceipts.myreceipts.model.ProizvodNaSmetka;
import com.myreceipts.myreceipts.model.Smetka;
import com.myreceipts.myreceipts.model.vm.Page;
import com.myreceipts.myreceipts.repository.PorizvodNaSmetkaRepository;
import com.myreceipts.myreceipts.repository.ProdavnicaRepository;
import com.myreceipts.myreceipts.repository.SmetkaRepository;
import com.myreceipts.myreceipts.repository.jpa.JpaSmetkaRepository;
import com.myreceipts.myreceipts.service.SmetkaService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class SmetkaServiceImpl implements SmetkaService {

    private final JpaSmetkaRepository jpaSmetkaRepository;
    private final SmetkaRepository smetkaRepository;
    private final ProdavnicaRepository prodavnicaRepository;
    private final PorizvodNaSmetkaRepository proizvodiNaSmetkaRepository;

    public SmetkaServiceImpl(JpaSmetkaRepository jpaSmetkaRepository, SmetkaRepository smetkaRepository, ProdavnicaRepository prodavnicaRepository, PorizvodNaSmetkaRepository proizvodiNaSmetkaRepository) {
        this.jpaSmetkaRepository = jpaSmetkaRepository;
        this.smetkaRepository = smetkaRepository;
        this.prodavnicaRepository = prodavnicaRepository;
        this.proizvodiNaSmetkaRepository = proizvodiNaSmetkaRepository;
    }

    @Override
    public Page<Smetka> getSmetkiWithProducts(Integer page, Integer size) {
        return this.smetkaRepository.getAllSmetkiWithProducts(page, size);
    }

    @Override
    public List<Smetka> findAll() {
        return this.jpaSmetkaRepository.findAll();
    }

    @Override
    public List<Object> findAllDto() {
        return this.jpaSmetkaRepository.findAllDto();
    }

    @Override
    public List<ProizvodNaSmetka> getSmetkaInfo(Integer idSmetka) {
        return this.proizvodiNaSmetkaRepository.findAllBySmetka_IdSmetka(idSmetka);
    }

    @Override
    public Smetka createSmetka(Date datum, Integer idProdavnica, Double vkupnoPromet, Float vkupnoDDV,
                               Optional<String> danochenBroj, Optional<String> ddvBroj) {
        Prodavnica prodavnica = this.prodavnicaRepository.findById(idProdavnica)
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
        return this.jpaSmetkaRepository.save(smetka);
    }
}
