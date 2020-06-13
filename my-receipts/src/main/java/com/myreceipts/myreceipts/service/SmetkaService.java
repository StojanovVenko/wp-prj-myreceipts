package com.myreceipts.myreceipts.service;

import com.myreceipts.myreceipts.model.ProizvodNaSmetka;
import com.myreceipts.myreceipts.model.Smetka;
import com.myreceipts.myreceipts.model.dto.UserMinMaxSmetkDTO;
import com.myreceipts.myreceipts.model.vm.Page;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface SmetkaService {

    Page<Smetka> getSmetkiWithProducts(Long idUser, Integer page, Integer size);

    Page<Smetka> getSmetkiWithProductsFiltered(Long idUser, int page, int size, int idGrad, int idProdavnica, Double startPrice, Double endPrice,
                                  Date startDate, Date endDate);

    List<Smetka> findAll(Long idUser);

    List<Object> findAllDto(Long idUser);

    List<ProizvodNaSmetka> getSmetkaInfo(Long idUser, Integer idSmetka);

    Smetka createSmetka(Long idUser, Date datum, Integer idProdavnica, Double vkupnoPromet, Float vkupnoDDV,
                        Optional<String> danochenBroj, Optional<String> ddvBroj);

    Object getMinMaxForUser(Long idUser);

    List<Double> getPoslednaNedelaCeni(Long id);

    void remove(Integer id);
}
