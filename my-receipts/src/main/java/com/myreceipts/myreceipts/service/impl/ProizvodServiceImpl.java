package com.myreceipts.myreceipts.service.impl;

import com.myreceipts.myreceipts.model.Proizvod;
import com.myreceipts.myreceipts.repository.ProizvodRepository;
import com.myreceipts.myreceipts.service.ProizvodService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProizvodServiceImpl implements ProizvodService {

    private final ProizvodRepository proizvodRepository;

    public ProizvodServiceImpl(ProizvodRepository proizvodRepository) {
        this.proizvodRepository = proizvodRepository;
    }

    @Override
    public List<Proizvod> findAll() {
        return this.proizvodRepository.findAll();
    }

    @Override
    public Proizvod createProizvod(String ime) {
        Proizvod proizvod = new Proizvod();
        proizvod.setIme(ime);
        return this.proizvodRepository.save(proizvod);
    }
}
