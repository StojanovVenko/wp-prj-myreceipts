package com.myreceipts.myreceipts.service;

import com.myreceipts.myreceipts.model.Grad;

import java.util.List;


public interface GradService {

    List<Grad> getAllGradovi();

    Grad createGrad(String imeGrad);

}
