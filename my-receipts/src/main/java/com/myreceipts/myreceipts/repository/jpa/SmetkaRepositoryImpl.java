package com.myreceipts.myreceipts.repository.jpa;

import com.myreceipts.myreceipts.model.Smetka;
import com.myreceipts.myreceipts.model.vm.Page;
import com.myreceipts.myreceipts.repository.SmetkaRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public class SmetkaRepositoryImpl implements SmetkaRepository {

    private final JpaSmetkaRepository repository;

    public SmetkaRepositoryImpl(JpaSmetkaRepository repository) {
        this.repository = repository;
    }

    @Override
    public Page<Smetka> getAllSmetkiWithProducts(Integer page, Integer size) {
        org.springframework.data.domain.Page<Smetka> result = this.repository.findAll(PageRequest.of(page, size));
        return new Page<>(page,
                result.getTotalPages(),
                size,
                result.getContent());
    }

    @Override
    public Page<Smetka> findAllSmetkiWithProductsFiltered(Integer page, Integer size, int idGrad,
                                                          int idProdavnica, Double startPrice,
                                                          Double endPrice, Date startDate, Date endDate) {
                Pageable req = PageRequest.of(page, size);
        org.springframework.data.domain.Page<Smetka> result = this.repository.findAllByProdavnica_Grad_IdGradAndProdavnica_IdProdavnicaAndVkupenPrometIsBetweenAndDatumIsBetween(
                idGrad, idProdavnica, startPrice, endPrice, startDate, endDate, PageRequest.of(page, size)
        );
//        org.springframework.data.domain.Page<Smetka> result = this.repository.findAllByProdavnica_IdProdavnica(
//                idProdavnica, req
//        );
        return new Page<>(page,
                result.getTotalPages(),
                size,
                result.getContent());
    }

    @Override
    public List<Smetka> findAll() {
        return this.repository.findAll();
    }

    @Override
    public List<Object> findAllDto() {
        return this.repository.findAllDto();
    }

    @Override
    public Smetka save(Smetka s) {
        return this.repository.save(s);
    }

    @Override
    public Optional<Smetka> findById(int idSmetka) {
        return this.repository.findById(idSmetka);
    }

    @Override
    public Page<Smetka> findAllSmetkiWithProductsFilteredSP(int page, int size, int idGrad, int idProdavnica,
                                                            Double startPrice, Date startDate, Date endDate) {
        org.springframework.data.domain.Page<Smetka> result =
                this.repository.findAllByProdavnica_Grad_IdGradAndProdavnica_IdProdavnicaAndVkupenPrometIsGreaterThanEqualAndDatumIsBetween(
                idGrad, idProdavnica, startPrice, startDate, endDate, PageRequest.of(page, size));

        return new Page<>(page,
                result.getTotalPages(),
                size,
                result.getContent());
    }

    @Override
    public Page<Smetka> findAllSmetkiWithProductsFiltered(int page, int size, int idGrad, Double startPrice,
                                                          Double endPrice, Date startDate, Date endDate) {
        org.springframework.data.domain.Page<Smetka> result =
                this.repository.findAllByProdavnica_Grad_IdGradAndVkupenPrometBetweenAndDatumBetween(
                        idGrad, startPrice, endPrice, startDate, endDate, PageRequest.of(page, size)
                );

        return new Page<>(page,
                result.getTotalPages(),
                size,
                result.getContent());
    }

    @Override
    public Page<Smetka> findAllSmetkiWithProductsFilteredEP(int page, int size, int idGrad, int idProdavnica,
                                                            Double endPrice, Date startDate, Date endDate) {
        org.springframework.data.domain.Page<Smetka> result =
                this.repository.findAllByProdavnica_Grad_IdGradAndProdavnica_IdProdavnicaAndVkupenPrometIsLessThanEqualAndDatumIsBetween(
                        idGrad, idProdavnica, endPrice, startDate, endDate, PageRequest.of(page, size)
                );

        return new Page<>(page,
                result.getTotalPages(),
                size,
                result.getContent());
    }

    @Override
    public Page<Smetka> findAllSmetkiWithProductsFilteredSP(int page, int size, int idGrad, Double startPrice,
                                                            Date startDate, Date endDate) {
        org.springframework.data.domain.Page<Smetka> result =
                this.repository.findAllByProdavnica_Grad_IdGradAndVkupenPrometIsGreaterThanEqualAndDatumIsBetween(
                        idGrad, startPrice, startDate, endDate, PageRequest.of(page, size)
                );

        return new Page<>(page,
                result.getTotalPages(),
                size,
                result.getContent());
    }

    @Override
    public Page<Smetka> findAllSmetkiWithProductsFilteredEP(int page, int size, int idGrad, Double endPrice,
                                                            Date startDate, Date endDate) {
        org.springframework.data.domain.Page<Smetka> result =
                this.repository.findAllByProdavnica_Grad_IdGradAndVkupenPrometIsLessThanEqualAndDatumIsBetween(
                        idGrad, endPrice, startDate, endDate, PageRequest.of(page, size)
                );

        return new Page<>(page,
                result.getTotalPages(),
                size,
                result.getContent());
    }

    @Override
    public Page<Smetka> findAllSmetkiWithProductsFiltered(int page, int size, int idGrad, int idProdavnica,
                                                          Date startDate, Date endDate) {
        org.springframework.data.domain.Page<Smetka> result =
                this.repository.findAllByProdavnica_Grad_IdGradAndProdavnica_IdProdavnicaAndDatumIsBetween(
                        idGrad, idProdavnica, startDate, endDate, PageRequest.of(page, size)
                );

        return new Page<>(page,
                result.getTotalPages(),
                size,
                result.getContent());
    }

    @Override
    public Page<Smetka> findAllSmetkiWithProductsFilteredSP(int page, int size, Double startPrice, Date startDate, Date endDate) {
        org.springframework.data.domain.Page<Smetka> result =
                this.repository.findAllByVkupenPrometIsGreaterThanEqualAndDatumIsBetween(startPrice,startDate,
                        endDate, PageRequest.of(page, size)
                );

        return new Page<>(page,
                result.getTotalPages(),
                size,
                result.getContent());
    }

    @Override
    public Page<Smetka> findAllSmetkiWithProductsFilteredEP(int page, int size, Double endPrice, Date startDate, Date endDate) {
        org.springframework.data.domain.Page<Smetka> result =
                this.repository.findAllByVkupenPrometIsLessThanEqualAndDatumIsBetween(endPrice,startDate,
                        endDate, PageRequest.of(page, size)
                );

        return new Page<>(page,
                result.getTotalPages(),
                size,
                result.getContent());
    }

    @Override
    public Page<Smetka> findAllSmetkiWithProductsFiltered(int page, int size, Double startPrice, Double endPrice, Date startDate, Date endDate) {
        org.springframework.data.domain.Page<Smetka> result =
                this.repository.findAllByVkupenPrometIsBetweenAndDatumIsBetween(startPrice, endPrice,startDate,
                        endDate, PageRequest.of(page, size)
                );

        return new Page<>(page,
                result.getTotalPages(),
                size,
                result.getContent());
    }

    @Override
    public Page<Smetka> findAllSmetkiWithProductsFilteredInFirma(int page, int size, int idFirma, int idProdavnica,
                                                                 Double startPrice, Double endPrice, Date startDate, Date endDate) {
        org.springframework.data.domain.Page<Smetka> result =
                this.repository.findByProdavnica_Firma_IdFirmaAndProdavnica_IdProdavnicaAndVkupenPrometIsBetweenAndDatumIsBetween(
                        idFirma, idProdavnica, startPrice, endPrice, startDate, endDate, PageRequest.of(page, size)
                );
        return new Page<>(page,
                result.getTotalPages(),
                size,
                result.getContent());
    }

    @Override
    public Page<Smetka> findAllSmetkiWithProductsFilteredInFirma(int page, int size, int idFirma, Double startPrice,
                                                                 Double endPrice, Date startDate, Date endDate) {
        org.springframework.data.domain.Page<Smetka> result =
                this.repository.findAllByProdavnica_Firma_IdFirmaAndVkupenPrometIsBetweenAndDatumIsBetween(
                        idFirma, startPrice, endPrice, startDate, endDate, PageRequest.of(page, size)
                );
        return new Page<>(page,
                result.getTotalPages(),
                size,
                result.getContent());
    }

    @Override
    public Page<Smetka> findAllSmetkiWithProductsFiltered(int page, int size, int idGrad, Date startDate,
                                                          Date endDate) {
        org.springframework.data.domain.Page<Smetka> result =
                this.repository.findAllByProdavnica_Grad_IdGradAndDatumIsBetween(
                        idGrad, startDate, endDate, PageRequest.of(page, size)
                );

        return new Page<>(page,
                result.getTotalPages(),
                size,
                result.getContent());
    }

    @Override
    public Page<Smetka> findAllSmetkiWithProductsFilteredEP(int page, int size, Date startDate, Date endDate) {
        org.springframework.data.domain.Page<Smetka> result =
               this.repository.findAllByDatumIsBetween(startDate, endDate, PageRequest.of(page, size));

        return new Page<>(page,
                result.getTotalPages(),
                size,
                result.getContent());
    }

}
