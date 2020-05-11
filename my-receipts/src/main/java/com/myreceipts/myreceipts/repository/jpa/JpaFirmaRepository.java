package com.myreceipts.myreceipts.repository.jpa;

import com.myreceipts.myreceipts.model.Firma;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JpaFirmaRepository extends JpaRepository<Firma, Integer> {

    Optional<Firma> findById(int idFirma);

}
