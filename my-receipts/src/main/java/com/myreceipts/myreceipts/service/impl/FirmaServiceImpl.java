package com.myreceipts.myreceipts.service.impl;

import com.myreceipts.myreceipts.model.Firma;
import com.myreceipts.myreceipts.model.Grad;
import com.myreceipts.myreceipts.model.Prodavnica;
import com.myreceipts.myreceipts.model.Smetka;
import com.myreceipts.myreceipts.model.vm.Constants;
import com.myreceipts.myreceipts.model.vm.Page;
import com.myreceipts.myreceipts.repository.FirmaRepository;
import com.myreceipts.myreceipts.repository.GradRepository;
import com.myreceipts.myreceipts.repository.ProdavnicaRepository;
import com.myreceipts.myreceipts.repository.SmetkaRepository;
import com.myreceipts.myreceipts.service.FirmaService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class FirmaServiceImpl implements FirmaService {

	private final FirmaRepository firmaRepository;
	private final GradRepository gradRepository;
	private final SmetkaRepository smetkaRepository;
	private final ProdavnicaRepository prodavnicaRepository;

	public FirmaServiceImpl(FirmaRepository firmaRepository, GradRepository gradRepository, SmetkaRepository smetkaRepository, ProdavnicaRepository prodavnicaRepository) {
		this.firmaRepository = firmaRepository;
		this.gradRepository = gradRepository;
		this.smetkaRepository = smetkaRepository;
		this.prodavnicaRepository = prodavnicaRepository;
	}

	@Override
	public Firma createFirma(String ime, String adresa, Integer idGrad) {
		Firma firma = new Firma();
		firma.setIme(ime);
		firma.setAdresa(adresa);

		Grad grad = this.gradRepository.findById(idGrad)
				.orElseThrow(() -> new NoSuchElementException("Ne postoi grad so id:" + idGrad));

		firma.setGrad(grad);
		return this.firmaRepository.save(firma);
	}

	@Override
	public List<Firma> findAll() {
		return this.firmaRepository.findAll();
	}

	@Override
	public Page<Smetka> findAllSmetkiInFirma(int page, int size, int idFirma, int idProdavnica, Double startPrice, Double endPrice, Date startDate, Date endDate) {
		if(idProdavnica != Constants.none){
			return smetkaRepository.findAllSmetkiWithProductsFilteredInFirma(page, size, idFirma, idProdavnica, startPrice, endPrice, startDate, endDate);
		}
		return smetkaRepository.findAllSmetkiWithProductsFilteredInFirma(page, size, idFirma, startPrice, endPrice, startDate, endDate);
	}

	@Override
	public Optional<Firma> findById(int idFirma) {
		return this.firmaRepository.findById(idFirma);
	}

	@Override
	public List<Prodavnica> getAllProdavnici(Integer idFirma) {
		return this.prodavnicaRepository.findAllProdavniciVoFirma(idFirma);
	}
}
