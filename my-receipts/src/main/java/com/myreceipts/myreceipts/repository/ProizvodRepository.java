package com.myreceipts.myreceipts.repository;

import com.myreceipts.myreceipts.model.Proizvod;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProizvodRepository {

    Optional<Proizvod> findById(Integer idProizvod);

    List<Proizvod> findAll();

    Proizvod save(Proizvod proizvod);

}
