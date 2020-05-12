package com.myreceipts.myreceipts.repository.jpa;

import com.myreceipts.myreceipts.model.Prodavnica;
import com.myreceipts.myreceipts.repository.ProdavnicaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ProdavnicaRepositoryImpl implements ProdavnicaRepository {

    private final JpaProdavnicaRepository prodavniciRepository;

    public ProdavnicaRepositoryImpl(JpaProdavnicaRepository prodavniciRepository) {
        this.prodavniciRepository = prodavniciRepository;
    }

    @Override
    public List<Prodavnica> findAll() {
        return this.prodavniciRepository.findAll();
    }

    @Override
    public Prodavnica save(Prodavnica prodavnica) {
        return this.prodavniciRepository.save(prodavnica);
    }

    @Override
    public Optional<Prodavnica> findById(Integer idProdavnica) {
        return this.prodavniciRepository.findById(idProdavnica);
    }

    @Override
    public List<Prodavnica> findAllProdavniciVoFirma(Integer idFirma) {
        return this.prodavniciRepository.findAllByFirma_IdFirma(idFirma);
    }

    @Override
    public List<Prodavnica> findAllProdavniciVoGrad(Integer idGrad) {
        return this.prodavniciRepository.findAllByGrad_IdGrad(idGrad);
    }
}
