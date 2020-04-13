package com.myreceipts.myreceipts.repository.jpa;

import com.myreceipts.myreceipts.model.Prodavnica;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaProdavnicaRepository extends JpaRepository<Prodavnica, Integer> {

}
