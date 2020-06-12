package com.myreceipts.myreceipts.service;

import com.myreceipts.myreceipts.model.Grad;
import com.myreceipts.myreceipts.model.Prodavnica;
import com.myreceipts.myreceipts.model.Smetka;
import com.myreceipts.myreceipts.model.vm.Page;

import java.util.Date;
import java.util.List;


public interface GradService {

    List<Grad> getAllGradovi();

    Grad createGrad(String imeGrad);

    Page<Smetka> findAllSmetkiInGrad(Long idUser,int page, int size, int idGrad, int idProdavnica, Double startPrice, Double endPrice, Date startDate, Date endDate);

    List<Prodavnica> getAllProdavnici(Integer idGrad);
}
