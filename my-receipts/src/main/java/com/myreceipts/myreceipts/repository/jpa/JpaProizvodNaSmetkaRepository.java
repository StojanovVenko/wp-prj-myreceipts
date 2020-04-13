package com.myreceipts.myreceipts.repository.jpa;

import com.myreceipts.myreceipts.model.ProizvodNaSmetka;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JpaProizvodNaSmetkaRepository extends JpaRepository<ProizvodNaSmetka, Integer> {

    public List<ProizvodNaSmetka> findAllBySmetka_IdSmetka(Integer idSmetka);

}
