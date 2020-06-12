package com.myreceipts.myreceipts.service.impl;

import com.myreceipts.myreceipts.model.Proizvod;
import com.myreceipts.myreceipts.model.ProizvodNaSmetka;
import com.myreceipts.myreceipts.model.Smetka;
import com.myreceipts.myreceipts.model.dto.ProizvodiNaSmetkaRequest;
import com.myreceipts.myreceipts.repository.ProizvodNaSmetkaRepository;
import com.myreceipts.myreceipts.repository.ProizvodRepository;
import com.myreceipts.myreceipts.repository.SmetkaRepository;
import com.myreceipts.myreceipts.service.ProizvodNaSmetkaService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ProizvodNaSmetkaServiceImpl implements ProizvodNaSmetkaService {

    private final ProizvodNaSmetkaRepository pnsRepository;
    private final ProizvodRepository proizvodRepository;
    private final SmetkaRepository smetkaRepository;

    public ProizvodNaSmetkaServiceImpl(ProizvodNaSmetkaRepository pnsRepository, ProizvodRepository proizvodRepository, SmetkaRepository smetkaRepository) {
        this.pnsRepository = pnsRepository;
        this.proizvodRepository = proizvodRepository;
        this.smetkaRepository = smetkaRepository;
    }

    @Override
    public List<ProizvodNaSmetka> findAll() {
        return this.pnsRepository.findAll();
    }

    @Override
    public ProizvodNaSmetka dodadiProizvodNaSmetka(Integer idProizvod, Integer idSmetka, Float cena, Float kolichina) {
        Proizvod proizvod = this.proizvodRepository.findById(idProizvod)
                .orElseThrow(() -> new NoSuchElementException("Ne postoi proizvod so id: " + idProizvod));
        Smetka smetka = this.smetkaRepository.findById(idSmetka)
                .orElseThrow(() -> new NoSuchElementException("Ne postoi smetka so id: " + idSmetka));

        ProizvodNaSmetka proizvodNaSmetka = new ProizvodNaSmetka();
        proizvodNaSmetka.setCena(cena);
        proizvodNaSmetka.setKolichina(kolichina);
        proizvodNaSmetka.setProizvod(proizvod);
        proizvodNaSmetka.setSmetka(smetka);
        return this.pnsRepository.save(proizvodNaSmetka);
    }

    private ProizvodNaSmetka dodadi(Integer idProizvod, Smetka smetka, Float cena, Float kolichina){
        Proizvod proizvod = this.proizvodRepository.findById(idProizvod)
                .orElseThrow(() -> new NoSuchElementException("Ne postoi proizvod so id: " + idProizvod));

        ProizvodNaSmetka proizvodNaSmetka = new ProizvodNaSmetka();
        proizvodNaSmetka.setCena(cena);
        proizvodNaSmetka.setKolichina(kolichina);
        proizvodNaSmetka.setProizvod(proizvod);
        proizvodNaSmetka.setSmetka(smetka);
        return this.pnsRepository.save(proizvodNaSmetka);
    }

    @Override
    public ProizvodiNaSmetkaRequest dodadiProizvodiNaSmetka(ProizvodiNaSmetkaRequest proizvodiNaSmetkaRequest) {
        Smetka smetka = this.smetkaRepository.findById(proizvodiNaSmetkaRequest.getIdSmetka())
                .orElseThrow(() -> new NoSuchElementException("Ne postoi smetka so id: " + proizvodiNaSmetkaRequest.getIdSmetka()));

        proizvodiNaSmetkaRequest.getListProizvodi()
                .forEach(p -> dodadi(p.getIdProizvod(), smetka, p.getCena(), p.getKolichina()));
        return proizvodiNaSmetkaRequest;
    }

    @Override
    public List<Object> getStatsForProductsInCityForUser(Long id, Double minPrice, Double maxPrice, Date startDate, Date endDate, Integer idGrad) {
        return this.pnsRepository.getStatsForProductsInCityForUser(id, minPrice, maxPrice, startDate, endDate, idGrad);
    }

    @Override
    public List<Object> getStatsForProductsInFirmForUser(Long id, Double minPrice, Double maxPrice, Date startDate, Date endDate, Integer idFirma) {
        return this.pnsRepository.getStatsForProductsInFirmForUser(id, minPrice, maxPrice, startDate, endDate, idFirma);
    }

    @Override
    public List<Object> getStatsForProductsInMarketForUser(Long id, Double minPrice, Double maxPrice, Date startDate, Date endDate, Integer idProdavnica) {
        return this.pnsRepository.getStatsForProductsInMarketForUser(id, minPrice, maxPrice, startDate, endDate, idProdavnica);
    }

    @Override
    public List<Object> getStatsForProductsForUser(Long id, Double minPrice, Double maxPrice, Date startDate, Date endDate) {
        return pnsRepository.getStatsForProductsForUser(id, minPrice, maxPrice, startDate, endDate);
    }

}
