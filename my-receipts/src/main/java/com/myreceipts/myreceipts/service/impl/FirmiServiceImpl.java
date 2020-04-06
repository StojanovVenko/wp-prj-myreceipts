package com.myreceipts.myreceipts.service.impl;

import com.myreceipts.myreceipts.model.Firma;
import com.myreceipts.myreceipts.model.Grad;
import com.myreceipts.myreceipts.repository.FirmiRepository;
import com.myreceipts.myreceipts.repository.GradoviRepository;
import com.myreceipts.myreceipts.service.FirmiService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class FirmiServiceImpl implements FirmiService {

    private final FirmiRepository firmiRepository;
    private final GradoviRepository gradoviRepository;

    public FirmiServiceImpl(FirmiRepository firmiRepository, GradoviRepository gradoviRepository) {
        this.firmiRepository = firmiRepository;
        this.gradoviRepository = gradoviRepository;
    }

    @Override
    public Firma createFirma(String ime, String adresa, Integer idGrad) {
        Firma firma = new Firma();
        firma.setIme(ime);
        firma.setAdresa(adresa);

        Grad grad = this.gradoviRepository.findById(idGrad)
                .orElseThrow(() -> new NoSuchElementException("Ne postoi grad so id:" + idGrad));

        firma.setGrad(grad);
        return this.firmiRepository.save(firma);
    }

    @Override
    public List<Firma> findAll() {
        return null;
    }
}
