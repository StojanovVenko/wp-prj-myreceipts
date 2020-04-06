package com.myreceipts.myreceipts.service;

import com.myreceipts.myreceipts.model.Proizvod;

import java.util.List;

public interface ProizvodiService {

    List<Proizvod> findAll();

    Proizvod createProizvod(String ime);

}
