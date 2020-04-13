package com.myreceipts.myreceipts.service;

import com.myreceipts.myreceipts.model.Prodavnica;

import java.util.List;

public interface ProdavnicaService {


    List<Prodavnica> findAll();

    Prodavnica createProdavnica(String ime, String adresa, Integer idFirma, Integer idGrad);

}
