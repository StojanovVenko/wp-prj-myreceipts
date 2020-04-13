package com.myreceipts.myreceipts.service.impl;

import com.myreceipts.myreceipts.model.Firma;
import com.myreceipts.myreceipts.model.Grad;
import com.myreceipts.myreceipts.repository.FirmaRepository;
import com.myreceipts.myreceipts.repository.GradRepository;
import com.myreceipts.myreceipts.service.FirmaService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class FirmaServiceImpl implements FirmaService {

    private final FirmaRepository firmaRepository;
    private final GradRepository gradRepository;

    public FirmaServiceImpl(FirmaRepository firmaRepository, GradRepository gradRepository) {
        this.firmaRepository = firmaRepository;
        this.gradRepository = gradRepository;
    }

    @Override
    public Firma createFirma(String ime, String adresa, Integer idGrad) {
        Firma firma = new Firma();
        firma.setIme(ime);
        firma.setAdresa(adresa);

        Grad grad = this.gradRepository.findById(idGrad)
                .orElseThrow(() -> new NoSuchElementException("Ne postoi grad so id:" + idGrad));

        firma.setGrad(grad);
        return this.firmaRepository.save(firma);
    }

    @Override
    public List<Firma> findAll() {
        return null;
    }
}
