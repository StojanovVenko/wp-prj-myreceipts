package com.myreceipts.myreceipts.service;

import com.myreceipts.myreceipts.model.ProizvodNaSmetka;
import com.myreceipts.myreceipts.model.dto.ProizvodiNaSmetkaRequest;

import java.util.Date;
import java.util.List;

public interface ProizvodNaSmetkaService {

    List<ProizvodNaSmetka> findAll();

    ProizvodNaSmetka dodadiProizvodNaSmetka(Integer idProizvod, Integer idSmetka, Float cena, Float kolichina);

    ProizvodiNaSmetkaRequest dodadiProizvodiNaSmetka(ProizvodiNaSmetkaRequest proizvodiNaSmetkaRequest);

    List<Object> getStatsForProductsInCityForUser(Long id, Double minPrice, Double maxPrice, Date startDate, Date endDate, Integer idGrad);

    List<Object> getStatsForProductsInFirmForUser(Long id, Double minPrice, Double maxPrice, Date startDate, Date endDate, Integer idFirma);

    List<Object> getStatsForProductsInMarketForUser(Long id, Double minPrice, Double maxPrice, Date startDate, Date endDate, Integer idProdavnica);

    List<Object> getStatsForProductsForUser(Long id, Double minPrice, Double maxPrice, Date startDate, Date endDate);
}
