package com.myreceipts.myreceipts.service;

import com.myreceipts.myreceipts.model.Firma;
import com.myreceipts.myreceipts.model.Prodavnica;
import com.myreceipts.myreceipts.model.Smetka;
import com.myreceipts.myreceipts.model.vm.Page;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface FirmaService {

    Firma createFirma(String ime, String adresa, Integer idGrad);

    List<Firma> findAll();

    Page<Smetka> findAllSmetkiInFirma(Long idUser, int page, int size, int idFirma, int idProdavnica, Double startPrice, Double endPrice, Date startDate, Date endDate);

    Optional<Firma> findById(int idFirma);

    List<Prodavnica> getAllProdavnici(Integer idFirma);
}
