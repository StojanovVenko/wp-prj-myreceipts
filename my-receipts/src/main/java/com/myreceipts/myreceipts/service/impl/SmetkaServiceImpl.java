package com.myreceipts.myreceipts.service.impl;

import com.myreceipts.myreceipts.model.Prodavnica;
import com.myreceipts.myreceipts.model.ProizvodNaSmetka;
import com.myreceipts.myreceipts.model.Smetka;
import com.myreceipts.myreceipts.model.vm.Constants;
import com.myreceipts.myreceipts.model.vm.Page;
import com.myreceipts.myreceipts.repository.PorizvodNaSmetkaRepository;
import com.myreceipts.myreceipts.repository.ProdavnicaRepository;
import com.myreceipts.myreceipts.repository.SmetkaRepository;
import com.myreceipts.myreceipts.service.SmetkaService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class SmetkaServiceImpl implements SmetkaService {

    private final SmetkaRepository smetkaRepository;
    private final ProdavnicaRepository prodavnicaRepository;
    private final PorizvodNaSmetkaRepository proizvodiNaSmetkaRepository;

    public SmetkaServiceImpl(SmetkaRepository smetkaRepository, ProdavnicaRepository prodavnicaRepository, PorizvodNaSmetkaRepository proizvodiNaSmetkaRepository) {
        this.smetkaRepository = smetkaRepository;
        this.prodavnicaRepository = prodavnicaRepository;
        this.proizvodiNaSmetkaRepository = proizvodiNaSmetkaRepository;
    }

    @Override
    public Page<Smetka> getSmetkiWithProducts(Integer page, Integer size) {
        return this.smetkaRepository.getAllSmetkiWithProducts(page, size);
    }

    @Override
    public Page<Smetka> getSmetkiWithProductsFiltered(int page, int size, int idGrad, int idProdavnica, Double startPrice, Double endPrice, Date startDate, Date endDate) {
        boolean grad =  Constants.none != idGrad;
        boolean prodavnica = Constants.none != idProdavnica;
        boolean sp = !startPrice.equals(Constants.minPrice);
        boolean ep = !endPrice.equals(Constants.maxPrice);

        if(sp && ep){
            if(prodavnica)
                return this.smetkaRepository.findAllSmetkiWithProductsFiltered(page, size, idGrad, idProdavnica, startPrice, endPrice, startDate, endDate);
             else if(grad)
                return this.smetkaRepository.findAllSmetkiWithProductsFiltered(page, size, idGrad, startPrice, endPrice, startDate, endDate);
            return this.smetkaRepository.findAllSmetkiWithProductsFiltered(page, size, startPrice, endPrice, startDate, endDate);
        } else if (sp) {
            if(prodavnica)
                return this.smetkaRepository.findAllSmetkiWithProductsFilteredSP(page, size, idGrad, idProdavnica, startPrice, startDate, endDate);
            else if(grad)
                return this.smetkaRepository.findAllSmetkiWithProductsFilteredSP(page, size, idGrad, startPrice, startDate, endDate);
            return this.smetkaRepository.findAllSmetkiWithProductsFilteredSP(page, size, startPrice, startDate, endDate);
        } else if (ep) {
            if(prodavnica)
                return this.smetkaRepository.findAllSmetkiWithProductsFilteredEP(page, size, idGrad, idProdavnica, endPrice, startDate, endDate);
            else if(grad)
                return this.smetkaRepository.findAllSmetkiWithProductsFilteredEP(page, size, idGrad, endPrice, startDate, endDate);
            return this.smetkaRepository.findAllSmetkiWithProductsFilteredEP(page, size, endPrice, startDate, endDate);
        }
        if(grad){
            if(prodavnica){
                return this.smetkaRepository.findAllSmetkiWithProductsFiltered(page, size, idGrad, idProdavnica, startDate, endDate);
            }
            return this.smetkaRepository.findAllSmetkiWithProductsFiltered(page, size, idGrad, startDate, endDate);
        }
        return this.smetkaRepository.findAllSmetkiWithProductsFilteredEP(page, size, startDate, endDate);
//        return this.smetkaRepository.getAllSmetkiWithProducts(page, size);
    }

    @Override
    public List<Smetka> findAll() {
        return this.smetkaRepository.findAll();
    }

    @Override
    public List<Object> findAllDto() {
        return this.smetkaRepository.findAllDto();
    }

    @Override
    public List<ProizvodNaSmetka> getSmetkaInfo(Integer idSmetka) {
        return this.proizvodiNaSmetkaRepository.findAllBySmetka_IdSmetka(idSmetka);
    }

    @Override
    public Smetka createSmetka(Date datum, Integer idProdavnica, Double vkupnoPromet, Float vkupnoDDV,
                               Optional<String> danochenBroj, Optional<String> ddvBroj) {
        Prodavnica prodavnica = this.prodavnicaRepository.findById(idProdavnica)
                .orElseThrow(() -> new NoSuchElementException("Ne postoi prodavnica so id: " + idProdavnica));

        Smetka smetka = new Smetka();
        smetka.setDatum(datum);
        smetka.setPregledana(0);
        smetka.setProdavnica(prodavnica);
        smetka.setVkupenPromet(vkupnoPromet);
        smetka.setVkupnoDDV(vkupnoDDV);
        if(ddvBroj.isPresent())
            smetka.setDdvBroj(ddvBroj.get());
        if(danochenBroj.isPresent())
            smetka.setDanochenBroj(danochenBroj.get());
        return this.smetkaRepository.save(smetka);
    }
}
