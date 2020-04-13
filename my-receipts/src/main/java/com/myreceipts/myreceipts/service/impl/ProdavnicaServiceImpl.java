package com.myreceipts.myreceipts.service.impl;

import com.myreceipts.myreceipts.model.Firma;
import com.myreceipts.myreceipts.model.Grad;
import com.myreceipts.myreceipts.model.Prodavnica;
import com.myreceipts.myreceipts.repository.FirmaRepository;
import com.myreceipts.myreceipts.repository.GradRepository;
import com.myreceipts.myreceipts.repository.ProdavnicaRepository;
import com.myreceipts.myreceipts.service.ProdavnicaService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ProdavnicaServiceImpl implements ProdavnicaService {

    private final ProdavnicaRepository prodavnicaRepository;
    private final FirmaRepository firmaRepository;
    private final GradRepository gradRepository;

    public ProdavnicaServiceImpl(ProdavnicaRepository prodavnicaRepository, FirmaRepository firmaRepository, GradRepository gradRepository) {
        this.prodavnicaRepository = prodavnicaRepository;
        this.firmaRepository = firmaRepository;
        this.gradRepository = gradRepository;
    }

    @Override
    public List<Prodavnica> findAll() {
        return this.prodavnicaRepository.findAll();
    }

    @Override
    public Prodavnica createProdavnica(String ime, String adresa, Integer idFirma, Integer idGrad) {
        Firma firma = this.firmaRepository.findById(idFirma)
                .orElseThrow(() -> new NoSuchElementException("Ne e pronajdena firma so id: " + idFirma));
        Grad grad = this.gradRepository.findById(idGrad)
                .orElseThrow(() -> new NoSuchElementException("Ne e pronajden grad so id: " + idGrad));

        Prodavnica prodavnica = new Prodavnica();
        prodavnica.setIme(ime);
        prodavnica.setAdresa(adresa);
        prodavnica.setFirma(firma);
        prodavnica.setGrad(grad);
        return this.prodavnicaRepository.save(prodavnica);
    }
}
