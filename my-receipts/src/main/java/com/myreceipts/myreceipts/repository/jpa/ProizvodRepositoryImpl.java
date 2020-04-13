package com.myreceipts.myreceipts.repository.jpa;

import com.myreceipts.myreceipts.model.Proizvod;
import com.myreceipts.myreceipts.repository.ProizvodRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ProizvodRepositoryImpl implements ProizvodRepository {

    private final JpaProizvodiRepository proizvodiRepository;

    public ProizvodRepositoryImpl(JpaProizvodiRepository proizvodiRepository) {
        this.proizvodiRepository = proizvodiRepository;
    }

    @Override
    public Optional<Proizvod> findById(Integer idProizvod) {
        return this.proizvodiRepository.findById(idProizvod);
    }

    @Override
    public List<Proizvod> findAll() {
        return this.proizvodiRepository.findAll();
    }

    @Override
    public Proizvod save(Proizvod proizvod) {
        return this.proizvodiRepository.save(proizvod);
    }
}
