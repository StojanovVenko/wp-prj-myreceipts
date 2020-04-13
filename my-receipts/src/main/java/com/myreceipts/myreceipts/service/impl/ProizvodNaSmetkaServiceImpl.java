package com.myreceipts.myreceipts.service.impl;

import com.myreceipts.myreceipts.model.Proizvod;
import com.myreceipts.myreceipts.model.ProizvodNaSmetka;
import com.myreceipts.myreceipts.model.Smetka;
import com.myreceipts.myreceipts.model.dto.ProizvodiNaSmetkaRequest;
import com.myreceipts.myreceipts.repository.PorizvodNaSmetkaRepository;
import com.myreceipts.myreceipts.repository.ProizvodRepository;
import com.myreceipts.myreceipts.repository.jpa.JpaSmetkaRepository;
import com.myreceipts.myreceipts.service.ProizvodNaSmetkaService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ProizvodNaSmetkaServiceImpl implements ProizvodNaSmetkaService {

    private final PorizvodNaSmetkaRepository porizvodNaSmetkaRepository;
    private final ProizvodRepository proizvodRepository;
    private final JpaSmetkaRepository jpaSmetkaRepository;

    public ProizvodNaSmetkaServiceImpl(PorizvodNaSmetkaRepository porizvodNaSmetkaRepository, ProizvodRepository proizvodRepository, JpaSmetkaRepository jpaSmetkaRepository) {
        this.porizvodNaSmetkaRepository = porizvodNaSmetkaRepository;
        this.proizvodRepository = proizvodRepository;
        this.jpaSmetkaRepository = jpaSmetkaRepository;
    }

    @Override
    public List<ProizvodNaSmetka> findAll() {
        return this.porizvodNaSmetkaRepository.findAll();
    }

    @Override
    public ProizvodNaSmetka dodadiProizvodNaSmetka(Integer idProizvod, Integer idSmetka, Float cena, Float kolichina) {
        Proizvod proizvod = this.proizvodRepository.findById(idProizvod)
                .orElseThrow(() -> new NoSuchElementException("Ne postoi proizvod so id: " + idProizvod));
        Smetka smetka = this.jpaSmetkaRepository.findById(idSmetka)
                .orElseThrow(() -> new NoSuchElementException("Ne postoi smetka so id: " + idSmetka));

        ProizvodNaSmetka proizvodNaSmetka = new ProizvodNaSmetka();
        proizvodNaSmetka.setCena(cena);
        proizvodNaSmetka.setKolichina(kolichina);
        proizvodNaSmetka.setProizvod(proizvod);
        proizvodNaSmetka.setSmetka(smetka);
        return this.porizvodNaSmetkaRepository.save(proizvodNaSmetka);
    }

    private ProizvodNaSmetka dodadi(Integer idProizvod, Smetka smetka, Float cena, Float kolichina){
        Proizvod proizvod = this.proizvodRepository.findById(idProizvod)
                .orElseThrow(() -> new NoSuchElementException("Ne postoi proizvod so id: " + idProizvod));

        ProizvodNaSmetka proizvodNaSmetka = new ProizvodNaSmetka();
        proizvodNaSmetka.setCena(cena);
        proizvodNaSmetka.setKolichina(kolichina);
        proizvodNaSmetka.setProizvod(proizvod);
        proizvodNaSmetka.setSmetka(smetka);
        return this.porizvodNaSmetkaRepository.save(proizvodNaSmetka);
    }

    @Override
    public ProizvodiNaSmetkaRequest dodadiProizvodiNaSmetka(ProizvodiNaSmetkaRequest proizvodiNaSmetkaRequest) {
        Smetka smetka = this.jpaSmetkaRepository.findById(proizvodiNaSmetkaRequest.getIdSmetka())
                .orElseThrow(() -> new NoSuchElementException("Ne postoi smetka so id: " + proizvodiNaSmetkaRequest.getIdSmetka()));

        proizvodiNaSmetkaRequest.getListProizvodi()
                .forEach(p -> dodadi(p.getIdProizvod(), smetka, p.getCena(), p.getKolichina()));
        return proizvodiNaSmetkaRequest;
    }

}
