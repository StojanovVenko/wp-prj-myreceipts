package com.myreceipts.myreceipts.repository;

import com.myreceipts.myreceipts.model.Grad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface GradRepository {

    Optional<Grad> findById(Integer idGrad);

    List<Grad> findAll();

    Grad save(Grad grad);

}
