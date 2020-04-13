package com.myreceipts.myreceipts.repository.jpa;

import com.myreceipts.myreceipts.model.Grad;
import com.myreceipts.myreceipts.repository.GradRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class GradRepositoryImpl implements GradRepository {

    private final JpaGradRepository gradoviRepository;


    public GradRepositoryImpl(JpaGradRepository gradoviRepository) {
        this.gradoviRepository = gradoviRepository;
    }

    @Override
    public Optional<Grad> findById(Integer idGrad) {
        return this.gradoviRepository.findById(idGrad);
    }

    @Override
    public List<Grad> findAll() {
        return this.gradoviRepository.findAll();
    }

    @Override
    public Grad save(Grad grad) {
        return this.gradoviRepository.save(grad);
    }

}
