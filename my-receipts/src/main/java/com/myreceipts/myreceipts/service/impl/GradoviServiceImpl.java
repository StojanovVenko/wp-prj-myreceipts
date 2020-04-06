package com.myreceipts.myreceipts.service.impl;

import com.myreceipts.myreceipts.model.Grad;
import com.myreceipts.myreceipts.repository.GradoviRepository;
import com.myreceipts.myreceipts.service.GradoviService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GradoviServiceImpl implements GradoviService {

    private final GradoviRepository gradoviRepository;

    public GradoviServiceImpl(GradoviRepository gradoviRepository) {
        this.gradoviRepository = gradoviRepository;
    }

    @Override
    public List<Grad> getAllGradovi() {
        return this.gradoviRepository.findAll();
    }

    @Override
    public Grad createGrad(String imeGrad) {
        Grad grad = new Grad();
        grad.setIme(imeGrad);
        return this.gradoviRepository.save(grad);
    }
}
