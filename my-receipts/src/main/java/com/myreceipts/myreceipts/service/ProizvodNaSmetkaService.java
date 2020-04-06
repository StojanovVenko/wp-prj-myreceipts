package com.myreceipts.myreceipts.service;

import com.myreceipts.myreceipts.model.ProizvodNaSmetka;

import java.util.List;

public interface ProizvodNaSmetkaService {

    List<ProizvodNaSmetka> findAll();

    ProizvodNaSmetka dodadiProizvodNaSmetka(Integer idProizvod, Integer idSmetka, Float cena, Float kolichina);

}
