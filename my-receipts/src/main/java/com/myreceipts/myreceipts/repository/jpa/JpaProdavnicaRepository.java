package com.myreceipts.myreceipts.repository.jpa;

import com.myreceipts.myreceipts.model.Prodavnica;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JpaProdavnicaRepository extends JpaRepository<Prodavnica, Integer> {

    List<Prodavnica> findAllByFirma_IdFirma(Integer idFirma);

}
