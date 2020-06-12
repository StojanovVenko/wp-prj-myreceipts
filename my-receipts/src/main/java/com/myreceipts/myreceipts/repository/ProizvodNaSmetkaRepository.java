package com.myreceipts.myreceipts.repository;

import com.myreceipts.myreceipts.model.ProizvodNaSmetka;

import java.util.Date;
import java.util.List;

public interface ProizvodNaSmetkaRepository {

    public List<ProizvodNaSmetka> findAllBySmetka_IdSmetka(Integer idSmetka);

    ProizvodNaSmetka save(ProizvodNaSmetka proizvodNaSmetka);

    List<ProizvodNaSmetka> findAll();

    List<Object> getStatsForProductsInCityForUser(Long idUser, Double minPrice, Double maxPrice, Date startDate, Date endDate, Integer idGrad);

    List<Object> getStatsForProductsInFirmForUser(Long idUser, Double minPrice, Double maxPrice, Date startDate, Date endDate, Integer idFirma);

    List<Object> getStatsForProductsInMarketForUser(Long idUser, Double minPrice, Double maxPrice, Date startDate, Date endDate, Integer idProdavnica );

    List<Object> getStatsForProductsForUser(Long idUser, Double minPrice, Double maxPrice, Date startDate, Date endDate);

}
