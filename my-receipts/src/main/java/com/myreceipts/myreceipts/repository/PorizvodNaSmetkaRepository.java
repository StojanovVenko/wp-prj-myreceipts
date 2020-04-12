package com.myreceipts.myreceipts.repository;

import com.myreceipts.myreceipts.model.ProizvodNaSmetka;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PorizvodNaSmetkaRepository extends JpaRepository<ProizvodNaSmetka, Integer> {

    public List<ProizvodNaSmetka> findAllBySmetka_IdSmetka(Integer idSmetka);

}
