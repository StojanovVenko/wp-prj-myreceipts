package com.myreceipts.myreceipts.repository;

import com.myreceipts.myreceipts.model.Prodavnica;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProdavnicaRepository {

    List<Prodavnica> findAll();

    Prodavnica save(Prodavnica prodavnica);

    Optional<Prodavnica> findById(Integer idProdavnica);

    List<Prodavnica> findAllProdavnici(Integer idFirma);
}
