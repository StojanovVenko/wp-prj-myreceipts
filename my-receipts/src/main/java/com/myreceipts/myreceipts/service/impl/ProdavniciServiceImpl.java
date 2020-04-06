package com.myreceipts.myreceipts.service.impl;

import com.myreceipts.myreceipts.model.Firma;
import com.myreceipts.myreceipts.model.Grad;
import com.myreceipts.myreceipts.model.Prodavnica;
import com.myreceipts.myreceipts.repository.FirmiRepository;
import com.myreceipts.myreceipts.repository.GradoviRepository;
import com.myreceipts.myreceipts.repository.ProdavniciRepository;
import com.myreceipts.myreceipts.service.ProdavniciService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ProdavniciServiceImpl implements ProdavniciService {

    private final ProdavniciRepository prodavniciRepository;
    private final FirmiRepository firmiRepository;
    private final GradoviRepository gradoviRepository;

    public ProdavniciServiceImpl(ProdavniciRepository prodavniciRepository, FirmiRepository firmiRepository, GradoviRepository gradoviRepository) {
        this.prodavniciRepository = prodavniciRepository;
        this.firmiRepository = firmiRepository;
        this.gradoviRepository = gradoviRepository;
    }

    @Override
    public List<Prodavnica> findAll() {
        return this.prodavniciRepository.findAll();
    }

    @Override
    public Prodavnica createProdavnica(String ime, String adresa, Integer idFirma, Integer idGrad) {
        Firma firma = this.firmiRepository.findById(idFirma)
                .orElseThrow(() -> new NoSuchElementException("Ne e pronajdena firma so id: " + idFirma));
        Grad grad = this.gradoviRepository.findById(idGrad)
                .orElseThrow(() -> new NoSuchElementException("Ne e pronajden grad so id: " + idGrad));

        Prodavnica prodavnica = new Prodavnica();
        prodavnica.setIme(ime);
        prodavnica.setAdresa(adresa);
        prodavnica.setFirma(firma);
        prodavnica.setGrad(grad);
        return this.prodavniciRepository.save(prodavnica);
    }
}
