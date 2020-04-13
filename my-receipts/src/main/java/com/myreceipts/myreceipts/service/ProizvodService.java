package com.myreceipts.myreceipts.service;

import com.myreceipts.myreceipts.model.Proizvod;

import java.util.List;

public interface ProizvodService {

    List<Proizvod> findAll();

    Proizvod createProizvod(String ime);

}
