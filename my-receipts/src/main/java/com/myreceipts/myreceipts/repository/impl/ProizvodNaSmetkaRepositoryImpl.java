package com.myreceipts.myreceipts.repository.impl;

import com.myreceipts.myreceipts.model.ProizvodNaSmetka;
import com.myreceipts.myreceipts.repository.ProizvodNaSmetkaRepository;
import com.myreceipts.myreceipts.repository.jpa.JpaProizvodNaSmetkaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public class ProizvodNaSmetkaRepositoryImpl implements ProizvodNaSmetkaRepository {

    private final JpaProizvodNaSmetkaRepository proizvodiNaSmetkiRepository;

    public ProizvodNaSmetkaRepositoryImpl(JpaProizvodNaSmetkaRepository proizvodiNaSmetkiRepository) {
        this.proizvodiNaSmetkiRepository = proizvodiNaSmetkiRepository;
    }

    @Override
    public List<ProizvodNaSmetka> findAllBySmetka_IdSmetka(Integer idSmetka) {
        return this.proizvodiNaSmetkiRepository.findAllBySmetka_IdSmetka(idSmetka);
    }

    @Override
    public ProizvodNaSmetka save(ProizvodNaSmetka proizvodNaSmetka) {
        return this.proizvodiNaSmetkiRepository.save(proizvodNaSmetka);
    }

    @Override
    public List<ProizvodNaSmetka> findAll() {
        return this.proizvodiNaSmetkiRepository.findAll();
    }

    @Override
    public List<Object> getStatsForProductsInCityForUser(Long idUser, Double minPrice, Double maxPrice, Date startDate, Date endDate, Integer idGrad) {
        return this.proizvodiNaSmetkiRepository.getStatsForProductsInCityForUser(idUser, minPrice, maxPrice, startDate, endDate, idGrad);
    }

    @Override
    public List<Object> getStatsForProductsInFirmForUser(Long idUser, Double minPrice, Double maxPrice, Date startDate, Date endDate, Integer idFirma) {
        return this.proizvodiNaSmetkiRepository.getStatsForProductsInFirmForUser(idUser, minPrice, maxPrice, startDate, endDate, idFirma);
    }

    @Override
    public List<Object> getStatsForProductsInMarketForUser(Long idUser, Double minPrice, Double maxPrice, Date startDate, Date endDate, Integer idProdavnica) {
        return this.proizvodiNaSmetkiRepository.getStatsForProductsInMarketForUser(idUser, minPrice, maxPrice, startDate, endDate, idProdavnica);
    }

    @Override
    public List<Object> getStatsForProductsForUser(Long idUser, Double minPrice, Double maxPrice, Date startDate, Date endDate) {
        return this.proizvodiNaSmetkiRepository.getStatsForProductsForUser(idUser, minPrice, maxPrice, startDate, endDate);
    }
}
