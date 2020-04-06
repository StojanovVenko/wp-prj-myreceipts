package com.myreceipts.myreceipts.service.impl;

import com.myreceipts.myreceipts.model.Proizvod;
import com.myreceipts.myreceipts.repository.ProizvodiRepository;
import com.myreceipts.myreceipts.service.ProizvodiService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProizvodServiceImpl implements ProizvodiService {

    private final ProizvodiRepository proizvodiRepository;

    public ProizvodServiceImpl(ProizvodiRepository proizvodiRepository) {
        this.proizvodiRepository = proizvodiRepository;
    }

    @Override
    public List<Proizvod> findAll() {
        return this.proizvodiRepository.findAll();
    }

    @Override
    public Proizvod createProizvod(String ime) {
        Proizvod proizvod = new Proizvod();
        proizvod.setIme(ime);
        return this.proizvodiRepository.save(proizvod);
    }
}
