package com.myreceipts.myreceipts.service;

import com.myreceipts.myreceipts.model.Grad;

import java.util.List;


public interface GradoviService {

    List<Grad> getAllGradovi();

    Grad createGrad(String imeGrad);

}
