package com.myreceipts.myreceipts.service.impl;

import com.myreceipts.myreceipts.model.Prodavnica;
import com.myreceipts.myreceipts.model.ProizvodNaSmetka;
import com.myreceipts.myreceipts.model.Smetka;
import com.myreceipts.myreceipts.model.User;
import com.myreceipts.myreceipts.model.vm.Constants;
import com.myreceipts.myreceipts.model.vm.Page;
import com.myreceipts.myreceipts.repository.ProizvodNaSmetkaRepository;
import com.myreceipts.myreceipts.repository.ProdavnicaRepository;
import com.myreceipts.myreceipts.repository.SmetkaRepository;
import com.myreceipts.myreceipts.repository.UserRepository;
import com.myreceipts.myreceipts.service.SmetkaService;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class SmetkaServiceImpl implements SmetkaService {

    private final SmetkaRepository smetkaRepository;
    private final ProdavnicaRepository prodavnicaRepository;
    private final ProizvodNaSmetkaRepository proizvodiNaSmetkaRepository;
    private final UserRepository userRepository;

    public SmetkaServiceImpl(SmetkaRepository smetkaRepository, ProdavnicaRepository prodavnicaRepository, ProizvodNaSmetkaRepository proizvodiNaSmetkaRepository, UserRepository userRepository) {
        this.smetkaRepository = smetkaRepository;
        this.prodavnicaRepository = prodavnicaRepository;
        this.proizvodiNaSmetkaRepository = proizvodiNaSmetkaRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Page<Smetka> getSmetkiWithProducts(Long idUser, Integer page, Integer size) {
        return this.smetkaRepository.getAllSmetkiWithProducts(idUser, page, size);
    }

    @Override
    public Page<Smetka> getSmetkiWithProductsFiltered(Long idUser, int page, int size, int idGrad, int idProdavnica, Double startPrice, Double endPrice, Date startDate, Date endDate) {
        boolean grad =  Constants.none != idGrad;
        boolean prodavnica = Constants.none != idProdavnica;
        boolean sp = !startPrice.equals(Constants.minPrice);
        boolean ep = !endPrice.equals(Constants.maxPrice);

        if(sp && ep){
            if(prodavnica)
                return this.smetkaRepository.findAllSmetkiWithProductsFiltered(idUser, page, size, idGrad, idProdavnica, startPrice, endPrice, startDate, endDate);
             else if(grad)
                return this.smetkaRepository.findAllSmetkiWithProductsFiltered(idUser, page, size, idGrad, startPrice, endPrice, startDate, endDate);
            return this.smetkaRepository.findAllSmetkiWithProductsFiltered(idUser, page, size, startPrice, endPrice, startDate, endDate);
        } else if (sp) {
            if(prodavnica)
                return this.smetkaRepository.findAllSmetkiWithProductsFilteredSP(idUser, page, size, idGrad, idProdavnica, startPrice, startDate, endDate);
            else if(grad)
                return this.smetkaRepository.findAllSmetkiWithProductsFilteredSP(idUser, page, size, idGrad, startPrice, startDate, endDate);
            return this.smetkaRepository.findAllSmetkiWithProductsFilteredSP(idUser, page, size, startPrice, startDate, endDate);
        } else if (ep) {
            if(prodavnica)
                return this.smetkaRepository.findAllSmetkiWithProductsFilteredEP(idUser, page, size, idGrad, idProdavnica, endPrice, startDate, endDate);
            else if(grad)
                return this.smetkaRepository.findAllSmetkiWithProductsFilteredEP(idUser, page, size, idGrad, endPrice, startDate, endDate);
            return this.smetkaRepository.findAllSmetkiWithProductsFilteredEP(idUser, page, size, endPrice, startDate, endDate);
        }
        if(grad){
            if(prodavnica){
                return this.smetkaRepository.findAllSmetkiWithProductsFiltered(idUser, page, size, idGrad, idProdavnica, startDate, endDate);
            }
            return this.smetkaRepository.findAllSmetkiWithProductsFiltered(idUser, page, size, idGrad, startDate, endDate);
        }
        return this.smetkaRepository.findAllSmetkiWithProductsFilteredEP(idUser, page, size, startDate, endDate);
//        return this.smetkaRepository.getAllSmetkiWithProducts(page, size);
    }

    @Override
    public List<Smetka> findAll(Long idUser) {
        return this.smetkaRepository.findAll(idUser);
    }

    @Override
    public List<Object> findAllDto(Long idUser) {
        return this.smetkaRepository.findAllDto(idUser);
    }

    @Override
    public List<ProizvodNaSmetka> getSmetkaInfo(Long idUser, Integer idSmetka) {
        return this.proizvodiNaSmetkaRepository.findAllBySmetka_IdSmetka(idSmetka);
    }

    @Override
    public Smetka createSmetka(Long idUser, Date datum, Integer idProdavnica, Double vkupnoPromet, Float vkupnoDDV,
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

    @Override
    public Object getMinMaxForUser(Long idUser) {
        return this.smetkaRepository.getMinMaxForUser(idUser);
    }

    @Override
    public List<Double> getPoslednaNedelaCeni(Long id) {
        List<Double> ceni = new ArrayList<>();
        for(int i=0; i<7; i++){
            Double sum = this.smetkaRepository.getPoslednaNedelaCeni(id, getDate(i+1), getDate(i));
            ceni.add(i, sum==null ? 0 : sum);
        }
        return ceni;
    }

    @Override
    public void remove(Integer id) {
        Optional<Smetka> smetka = this.smetkaRepository.findById(id);
        if(!smetka.isPresent())
            return;
        Smetka s = smetka.get();
        s.getUser().setSmetkaList(s.getUser().getSmetkaList()
                .stream()
                .filter(ss -> !ss.getIdSmetka().equals(id)).collect(Collectors.toList()));
        this.smetkaRepository.remove(s);
    }

    private Date getDate(Integer offset) {
        Date date = new Date();
        date.setDate(date.getDate()-offset);
        return date;
    }
}
