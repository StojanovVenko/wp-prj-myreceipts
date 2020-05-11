package com.myreceipts.myreceipts.repository;

import com.myreceipts.myreceipts.model.Smetka;
import com.myreceipts.myreceipts.model.vm.Page;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface SmetkaRepository {

    Page<Smetka> getAllSmetkiWithProducts(Integer page, Integer size);

    Page<Smetka> findAllSmetkiWithProductsFiltered(Integer page, Integer size, int idGrad, int idProdavnica, Double startPrice,
                                                  Double endPrice, Date startDate, Date endDate);

    List<Smetka> findAll();

    List<Object> findAllDto();

    Smetka save(Smetka s);

    Optional<Smetka> findById(int idSmetka);

    Page<Smetka> findAllSmetkiWithProductsFilteredSP(int page, int size, int idGrad, int idProdavnica, Double startPrice, Date startDate, Date endDate);

    Page<Smetka> findAllSmetkiWithProductsFiltered(int page, int size, int idGrad, Double startPrice, Double endPrice, Date startDate, Date endDate);

    Page<Smetka> findAllSmetkiWithProductsFilteredEP(int page, int size, int idGrad, int idProdavnica, Double endPrice, Date startDate, Date endDate);

    Page<Smetka> findAllSmetkiWithProductsFilteredSP(int page, int size, int idGrad, Double startPrice, Date startDate, Date endDate);

    Page<Smetka> findAllSmetkiWithProductsFilteredEP(int page, int size, int idGrad, Double endPrice, Date startDate, Date endDate);

    Page<Smetka> findAllSmetkiWithProductsFilteredEP(int page, int size, Date startDate, Date endDate);

    Page<Smetka> findAllSmetkiWithProductsFiltered(int page, int size, int idGrad, Date startDate, Date endDate);

    Page<Smetka> findAllSmetkiWithProductsFiltered(int page, int size, int idGrad, int idProdavnica, Date startDate, Date endDate);

    Page<Smetka> findAllSmetkiWithProductsFilteredSP(int page, int size,  Double startPrice, Date startDate, Date endDate);

    Page<Smetka> findAllSmetkiWithProductsFilteredEP(int page, int size,  Double endPrice, Date startDate, Date endDate);

    Page<Smetka> findAllSmetkiWithProductsFiltered(int page, int size, Double startPrice, Double endPrice, Date startDate, Date endDate);

    Page<Smetka> findAllSmetkiWithProductsFilteredInFirma(int page, int size, int idFirma, int idProdavnica, Double startPrice, Double endPrice, Date startDate, Date endDate);

    Page<Smetka> findAllSmetkiWithProductsFilteredInFirma(int page, int size, int idFirma, Double startPrice, Double endPrice, Date startDate, Date endDate);
}
