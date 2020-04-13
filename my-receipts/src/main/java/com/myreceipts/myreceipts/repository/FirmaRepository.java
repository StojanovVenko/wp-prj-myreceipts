package com.myreceipts.myreceipts.repository;

import com.myreceipts.myreceipts.model.Firma;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FirmaRepository {

    Optional<Firma> findById(Integer idFirma);

    Firma save(Firma firma);

}
