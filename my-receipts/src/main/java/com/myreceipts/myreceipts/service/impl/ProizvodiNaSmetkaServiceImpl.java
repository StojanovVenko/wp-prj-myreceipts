package com.myreceipts.myreceipts.service.impl;

import com.myreceipts.myreceipts.model.Proizvod;
import com.myreceipts.myreceipts.model.ProizvodNaSmetka;
import com.myreceipts.myreceipts.model.Smetka;
import com.myreceipts.myreceipts.repository.PorizvodNaSmetkaRepository;
import com.myreceipts.myreceipts.repository.ProizvodiRepository;
import com.myreceipts.myreceipts.repository.SmetkiRepository;
import com.myreceipts.myreceipts.service.ProizvodNaSmetkaService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ProizvodiNaSmetkaServiceImpl implements ProizvodNaSmetkaService {

    private final PorizvodNaSmetkaRepository porizvodNaSmetkaRepository;
    private final ProizvodiRepository proizvodiRepository;
    private final SmetkiRepository smetkiRepository;

    public ProizvodiNaSmetkaServiceImpl(PorizvodNaSmetkaRepository porizvodNaSmetkaRepository, ProizvodiRepository proizvodiRepository, SmetkiRepository smetkiRepository) {
        this.porizvodNaSmetkaRepository = porizvodNaSmetkaRepository;
        this.proizvodiRepository = proizvodiRepository;
        this.smetkiRepository = smetkiRepository;
    }

    @Override
    public List<ProizvodNaSmetka> findAll() {
        return this.porizvodNaSmetkaRepository.findAll();
    }

    @Override
    public ProizvodNaSmetka dodadiProizvodNaSmetka(Integer idProizvod, Integer idSmetka, Float cena, Float kolichina) {
        Proizvod proizvod = this.proizvodiRepository.findById(idProizvod)
                .orElseThrow(() -> new NoSuchElementException("Ne postoi proizvod so id: " + idProizvod));
        Smetka smetka = this.smetkiRepository.findById(idSmetka)
                .orElseThrow(() -> new NoSuchElementException("Ne postoi smetka so id: " + idSmetka));

        ProizvodNaSmetka proizvodNaSmetka = new ProizvodNaSmetka();
        proizvodNaSmetka.setCena(cena);
        proizvodNaSmetka.setKolichina(kolichina);
        proizvodNaSmetka.setProizvod(proizvod);
        proizvodNaSmetka.setSmetka(smetka);
        return this.porizvodNaSmetkaRepository.save(proizvodNaSmetka);
    }

}
