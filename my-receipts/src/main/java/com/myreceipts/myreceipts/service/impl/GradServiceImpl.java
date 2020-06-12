package com.myreceipts.myreceipts.service.impl;

import com.myreceipts.myreceipts.model.Grad;
import com.myreceipts.myreceipts.model.Prodavnica;
import com.myreceipts.myreceipts.model.Smetka;
import com.myreceipts.myreceipts.model.vm.Constants;
import com.myreceipts.myreceipts.model.vm.Page;
import com.myreceipts.myreceipts.repository.GradRepository;
import com.myreceipts.myreceipts.repository.ProdavnicaRepository;
import com.myreceipts.myreceipts.repository.SmetkaRepository;
import com.myreceipts.myreceipts.service.GradService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class GradServiceImpl implements GradService {

    private final GradRepository gradRepository;
    private final SmetkaRepository smetkaRepository;
    private final ProdavnicaRepository prodavnicaRepository;

    public GradServiceImpl(GradRepository gradRepository, SmetkaRepository smetkaRepository, ProdavnicaRepository prodavnicaRepository) {
        this.gradRepository = gradRepository;
        this.smetkaRepository = smetkaRepository;
        this.prodavnicaRepository = prodavnicaRepository;
    }

    @Override
    public List<Grad> getAllGradovi() {
        return this.gradRepository.findAll();
    }

    @Override
    public Grad createGrad(String imeGrad) {
        Grad grad = new Grad();
        grad.setIme(imeGrad);
        return this.gradRepository.save(grad);
    }

    @Override
    public Page<Smetka> findAllSmetkiInGrad(Long idUser, int page, int size, int idGrad, int idProdavnica, Double startPrice, Double endPrice, Date startDate, Date endDate) {
        if(idProdavnica != Constants.none){
            return smetkaRepository.findAllSmetkiWithProductsFilteredInGrad(idUser, page, size, idGrad, idProdavnica, startPrice, endPrice, startDate, endDate);
        }
        return smetkaRepository.findAllSmetkiWithProductsFilteredInGrad(idUser, page, size, idGrad, startPrice, endPrice, startDate, endDate);

    }

    @Override
    public List<Prodavnica> getAllProdavnici(Integer idGrad) {
        return this.prodavnicaRepository.findAllProdavniciVoGrad(idGrad);
    }
}
