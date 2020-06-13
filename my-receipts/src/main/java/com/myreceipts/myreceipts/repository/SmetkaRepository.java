package com.myreceipts.myreceipts.repository;

import com.myreceipts.myreceipts.model.Smetka;
import com.myreceipts.myreceipts.model.dto.UserMinMaxSmetkDTO;
import com.myreceipts.myreceipts.model.vm.Page;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface SmetkaRepository {

    Page<Smetka> getAllSmetkiWithProducts(Long idUser, Integer page, Integer size);

    Page<Smetka> findAllSmetkiWithProductsFiltered(Long idUser, Integer page, Integer size, int idGrad, int idProdavnica, Double startPrice,
                                                  Double endPrice, Date startDate, Date endDate);

    List<Smetka> findAll(Long idUser);

    List<Object> findAllDto(Long idUser);

    Smetka save(Smetka s);

    Optional<Smetka> findById(int idSmetka);

    Page<Smetka> findAllSmetkiWithProductsFilteredSP(Long idUser, int page, int size, int idGrad, int idProdavnica, Double startPrice, Date startDate, Date endDate);

    Page<Smetka> findAllSmetkiWithProductsFiltered(Long idUser, int page, int size, int idGrad, Double startPrice, Double endPrice, Date startDate, Date endDate);

    Page<Smetka> findAllSmetkiWithProductsFilteredEP(Long idUser, int page, int size, int idGrad, int idProdavnica, Double endPrice, Date startDate, Date endDate);

    Page<Smetka> findAllSmetkiWithProductsFilteredSP(Long idUser, int page, int size, int idGrad, Double startPrice, Date startDate, Date endDate);

    Page<Smetka> findAllSmetkiWithProductsFilteredEP(Long idUser, int page, int size, int idGrad, Double endPrice, Date startDate, Date endDate);

    Page<Smetka> findAllSmetkiWithProductsFilteredEP(Long idUser, int page, int size, Date startDate, Date endDate);

    Page<Smetka> findAllSmetkiWithProductsFiltered(Long idUser, int page, int size, int idGrad, Date startDate, Date endDate);

    Page<Smetka> findAllSmetkiWithProductsFiltered(Long idUser, int page, int size, int idGrad, int idProdavnica, Date startDate, Date endDate);

    Page<Smetka> findAllSmetkiWithProductsFilteredSP(Long idUser, int page, int size,  Double startPrice, Date startDate, Date endDate);

    Page<Smetka> findAllSmetkiWithProductsFilteredEP(Long idUser, int page, int size,  Double endPrice, Date startDate, Date endDate);

    Page<Smetka> findAllSmetkiWithProductsFiltered(Long idUser, int page, int size, Double startPrice, Double endPrice, Date startDate, Date endDate);

    Page<Smetka> findAllSmetkiWithProductsFilteredInFirma(Long idUser, int page, int size, int idFirma, int idProdavnica, Double startPrice, Double endPrice, Date startDate, Date endDate);

    Page<Smetka> findAllSmetkiWithProductsFilteredInFirma(Long idUser, int page, int size, int idFirma, Double startPrice, Double endPrice, Date startDate, Date endDate);

    Page<Smetka> findAllSmetkiWithProductsFilteredInGrad(Long idUser, int page, int size, int idGrad, int idProdavnica, Double startPrice, Double endPrice, Date startDate, Date endDate);

    Page<Smetka> findAllSmetkiWithProductsFilteredInGrad(Long idUser, int page, int size, int idGrad, Double startPrice, Double endPrice, Date startDate, Date endDate);

    Object getMinMaxForUser(Long idUser);

    Double getPoslednaNedelaCeni(Long idUser, Date startDate, Date endDate);

    void remove(Smetka s);
}
