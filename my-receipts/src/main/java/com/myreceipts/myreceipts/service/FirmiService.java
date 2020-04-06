package com.myreceipts.myreceipts.service;

import com.myreceipts.myreceipts.model.Firma;

import java.util.List;

public interface FirmiService {

    Firma createFirma(String ime, String adresa, Integer idGrad);

    List<Firma> findAll();

}
