package com.myreceipts.myreceipts.service.impl;

import com.myreceipts.myreceipts.model.Grad;
import com.myreceipts.myreceipts.repository.GradRepository;
import com.myreceipts.myreceipts.service.GradService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GradServiceImpl implements GradService {

    private final GradRepository gradRepository;

    public GradServiceImpl(GradRepository gradRepository) {
        this.gradRepository = gradRepository;
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
}
