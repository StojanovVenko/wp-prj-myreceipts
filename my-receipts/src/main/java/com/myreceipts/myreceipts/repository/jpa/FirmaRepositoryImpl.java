package com.myreceipts.myreceipts.repository.jpa;

import com.myreceipts.myreceipts.model.Firma;
import com.myreceipts.myreceipts.repository.FirmaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class FirmaRepositoryImpl implements FirmaRepository {

    private final JpaFirmaRepository firmiRepository;

    public FirmaRepositoryImpl(JpaFirmaRepository firmiRepository) {
        this.firmiRepository = firmiRepository;
    }


    @Override
    public Optional<Firma> findById(Integer idFirma) {
        return this.firmiRepository.findById(idFirma);
    }

    @Override
    public Firma save(Firma firma) {
        return this.firmiRepository.save(firma);
    }
}
