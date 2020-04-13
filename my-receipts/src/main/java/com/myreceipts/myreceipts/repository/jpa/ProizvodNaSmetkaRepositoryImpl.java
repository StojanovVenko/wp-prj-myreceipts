package com.myreceipts.myreceipts.repository.jpa;

import com.myreceipts.myreceipts.model.ProizvodNaSmetka;
import com.myreceipts.myreceipts.repository.PorizvodNaSmetkaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProizvodNaSmetkaRepositoryImpl implements PorizvodNaSmetkaRepository {

    private final JpaProizvodNaSmetkaRepository proizvodiNaSmetkiRepository;

    public ProizvodNaSmetkaRepositoryImpl(JpaProizvodNaSmetkaRepository proizvodiNaSmetkiRepository) {
        this.proizvodiNaSmetkiRepository = proizvodiNaSmetkiRepository;
    }

    @Override
    public List<ProizvodNaSmetka> findAllBySmetka_IdSmetka(Integer idSmetka) {
        return this.proizvodiNaSmetkiRepository.findAllBySmetka_IdSmetka(idSmetka);
    }

    @Override
    public ProizvodNaSmetka save(ProizvodNaSmetka proizvodNaSmetka) {
        return this.proizvodiNaSmetkiRepository.save(proizvodNaSmetka);
    }

    @Override
    public List<ProizvodNaSmetka> findAll() {
        return this.proizvodiNaSmetkiRepository.findAll();
    }
}
