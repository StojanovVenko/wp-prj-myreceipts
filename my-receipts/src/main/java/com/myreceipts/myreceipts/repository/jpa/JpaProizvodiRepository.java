package com.myreceipts.myreceipts.repository.jpa;

import com.myreceipts.myreceipts.model.Proizvod;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaProizvodiRepository extends JpaRepository<Proizvod, Integer> {
}
