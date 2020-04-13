package com.myreceipts.myreceipts.repository.jpa;

import com.myreceipts.myreceipts.model.Firma;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaFirmaRepository extends JpaRepository<Firma, Integer> {
}
