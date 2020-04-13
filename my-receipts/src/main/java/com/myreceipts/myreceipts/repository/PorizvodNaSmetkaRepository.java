package com.myreceipts.myreceipts.repository;

import com.myreceipts.myreceipts.model.ProizvodNaSmetka;

import java.util.List;

public interface PorizvodNaSmetkaRepository {

    public List<ProizvodNaSmetka> findAllBySmetka_IdSmetka(Integer idSmetka);

    ProizvodNaSmetka save(ProizvodNaSmetka proizvodNaSmetka);

    List<ProizvodNaSmetka> findAll();

}
