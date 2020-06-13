package com.myreceipts.myreceipts.repository.impl;

import com.myreceipts.myreceipts.model.Smetka;
import com.myreceipts.myreceipts.model.User;
import com.myreceipts.myreceipts.model.dto.UserMinMaxSmetkDTO;
import com.myreceipts.myreceipts.model.vm.Page;
import com.myreceipts.myreceipts.repository.SmetkaRepository;
import com.myreceipts.myreceipts.repository.jpa.JpaSmetkaRepository;
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
    public Page<Smetka> getAllSmetkiWithProducts(Long idUser, Integer page, Integer size) {
        org.springframework.data.domain.Page<Smetka> result = this.repository.findAll(PageRequest.of(page, size));
        return new Page<>(page,
                result.getTotalPages(),
                size,
                result.getContent());
    }

    @Override
    public Page<Smetka> findAllSmetkiWithProductsFiltered(Long idUser, Integer page, Integer size, int idGrad,
                                                          int idProdavnica, Double startPrice,
                                                          Double endPrice, Date startDate, Date endDate) {
                Pageable req = PageRequest.of(page, size);
        org.springframework.data.domain.Page<Smetka> result = this.repository.findAllByUser_IdAndProdavnica_Grad_IdGradAndProdavnica_IdProdavnicaAndVkupenPrometIsBetweenAndDatumIsBetweenOrderByDatumDesc(
                idUser, idGrad, idProdavnica, startPrice, endPrice, startDate, endDate, PageRequest.of(page, size)
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
    public List<Smetka> findAll(Long idUser) {
        return this.repository.findAll();
    }

    @Override
    public List<Object> findAllDto(Long idUser) {
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
    public Page<Smetka> findAllSmetkiWithProductsFilteredSP(Long idUser,
                                                            int page,
                                                            int size,
                                                            int idGrad,
                                                            int idProdavnica,
                                                            Double startPrice,
                                                            Date startDate,
                                                            Date endDate) {
        org.springframework.data.domain.Page<Smetka> result =
                this.repository.findAllByUser_IdAndProdavnica_Grad_IdGradAndProdavnica_IdProdavnicaAndVkupenPrometIsGreaterThanEqualAndDatumIsBetweenOrderByDatumDesc(
                        idUser, idGrad, idProdavnica, startPrice, startDate, endDate, PageRequest.of(page, size));

        return new Page<>(page,
                result.getTotalPages(),
                size,
                result.getContent());
    }

    @Override
    public Page<Smetka> findAllSmetkiWithProductsFiltered(Long idUser,
                                                          int page,
                                                          int size,
                                                          int idGrad,
                                                          Double startPrice,
                                                          Double endPrice,
                                                          Date startDate,
                                                          Date endDate) {
        org.springframework.data.domain.Page<Smetka> result =
                this.repository.findAllByUser_IdAndProdavnica_Grad_IdGradAndVkupenPrometBetweenAndDatumBetweenOrderByDatumDesc(
                        idUser, idGrad, startPrice, endPrice, startDate, endDate, PageRequest.of(page, size)
                );

        return new Page<>(page,
                result.getTotalPages(),
                size,
                result.getContent());
    }

    @Override
    public Page<Smetka> findAllSmetkiWithProductsFilteredEP(Long idUser,
                                                            int page,
                                                            int size,
                                                            int idGrad,
                                                            int idProdavnica,
                                                            Double endPrice,
                                                            Date startDate,
                                                            Date endDate) {
        org.springframework.data.domain.Page<Smetka> result =
                this.repository.findAllByUser_IdAndProdavnica_Grad_IdGradAndProdavnica_IdProdavnicaAndVkupenPrometIsLessThanEqualAndDatumIsBetweenOrderByDatumDesc(
                        idUser, idGrad, idProdavnica, endPrice, startDate, endDate, PageRequest.of(page, size)
                );

        return new Page<>(page,
                result.getTotalPages(),
                size,
                result.getContent());
    }

    @Override
    public Page<Smetka> findAllSmetkiWithProductsFilteredSP(Long idUser,
                                                            int page,
                                                            int size,
                                                            int idGrad,
                                                            Double startPrice,
                                                            Date startDate,
                                                            Date endDate) {
        org.springframework.data.domain.Page<Smetka> result =
                this.repository.findAllByUser_IdAndProdavnica_Grad_IdGradAndVkupenPrometIsGreaterThanEqualAndDatumIsBetweenOrderByDatumDesc(
                        idUser, idGrad, startPrice, startDate, endDate, PageRequest.of(page, size)
                );

        return new Page<>(page,
                result.getTotalPages(),
                size,
                result.getContent());
    }

    @Override
    public Page<Smetka> findAllSmetkiWithProductsFilteredEP(Long idUser,
                                                            int page,
                                                            int size,
                                                            int idGrad,
                                                            Double endPrice,
                                                            Date startDate,
                                                            Date endDate) {
        org.springframework.data.domain.Page<Smetka> result =
                this.repository.findAllByUser_IdAndProdavnica_Grad_IdGradAndVkupenPrometIsLessThanEqualAndDatumIsBetweenOrderByDatumDesc(
                        idUser, idGrad, endPrice, startDate, endDate, PageRequest.of(page, size)
                );

        return new Page<>(page,
                result.getTotalPages(),
                size,
                result.getContent());
    }

    @Override
    public Page<Smetka> findAllSmetkiWithProductsFiltered(Long idUser,
                                                          int page,
                                                          int size,
                                                          int idGrad,
                                                          int idProdavnica,
                                                          Date startDate, Date endDate) {
        org.springframework.data.domain.Page<Smetka> result =
                this.repository.findAllByUser_IdAndProdavnica_Grad_IdGradAndProdavnica_IdProdavnicaAndDatumIsBetweenOrderByDatumDesc(
                        idUser, idGrad, idProdavnica, startDate, endDate, PageRequest.of(page, size)
                );

        return new Page<>(page,
                result.getTotalPages(),
                size,
                result.getContent());
    }

    @Override
    public Page<Smetka> findAllSmetkiWithProductsFilteredSP(Long idUser,
                                                            int page,
                                                            int size,
                                                            Double startPrice,
                                                            Date startDate,
                                                            Date endDate) {
        org.springframework.data.domain.Page<Smetka> result =
                this.repository.findAllByUser_IdAndVkupenPrometIsGreaterThanEqualAndDatumIsBetweenOrderByDatumDesc(idUser, startPrice,startDate,
                        endDate, PageRequest.of(page, size)
                );

        return new Page<>(page,
                result.getTotalPages(),
                size,
                result.getContent());
    }

    @Override
    public Page<Smetka> findAllSmetkiWithProductsFilteredEP(Long idUser,
                                                            int page,
                                                            int size,
                                                            Double endPrice,
                                                            Date startDate,
                                                            Date endDate) {
        org.springframework.data.domain.Page<Smetka> result =
                this.repository.findAllByUser_IdAndVkupenPrometIsLessThanEqualAndDatumIsBetweenOrderByDatumDesc(idUser, endPrice,startDate,
                        endDate, PageRequest.of(page, size)
                );

        return new Page<>(page,
                result.getTotalPages(),
                size,
                result.getContent());
    }

    @Override
    public Page<Smetka> findAllSmetkiWithProductsFiltered(Long idUser,
                                                          int page,
                                                          int size,
                                                          Double startPrice,
                                                          Double endPrice,
                                                          Date startDate,
                                                          Date endDate) {
        org.springframework.data.domain.Page<Smetka> result =
                this.repository.findAllByUser_IdAndVkupenPrometIsBetweenAndDatumIsBetweenOrderByDatumDesc(idUser, startPrice, endPrice,startDate,
                        endDate, PageRequest.of(page, size)
                );

        return new Page<>(page,
                result.getTotalPages(),
                size,
                result.getContent());
    }

    @Override
    public Page<Smetka> findAllSmetkiWithProductsFilteredInFirma(Long idUser,
                                                                 int page,
                                                                 int size,
                                                                 int idFirma,
                                                                 int idProdavnica,
                                                                 Double startPrice,
                                                                 Double endPrice,
                                                                 Date startDate,
                                                                 Date endDate) {
        org.springframework.data.domain.Page<Smetka> result =
                this.repository.findAllByUser_IdAndProdavnica_Firma_IdFirmaAndProdavnica_IdProdavnicaAndVkupenPrometIsBetweenAndDatumIsBetweenOrderByDatumDesc(
                        idUser, idFirma, idProdavnica, startPrice, endPrice, startDate, endDate, PageRequest.of(page, size)
                );
        return new Page<>(page,
                result.getTotalPages(),
                size,
                result.getContent());
    }

    @Override
    public Page<Smetka> findAllSmetkiWithProductsFilteredInFirma(Long idUser,
                                                                 int page,
                                                                 int size,
                                                                 int idFirma,
                                                                 Double startPrice,
                                                                 Double endPrice,
                                                                 Date startDate,
                                                                 Date endDate) {
        org.springframework.data.domain.Page<Smetka> result =
                this.repository.findAllByUser_IdAndProdavnica_Firma_IdFirmaAndVkupenPrometIsBetweenAndDatumIsBetweenOrderByDatumDesc(
                        idUser, idFirma, startPrice, endPrice, startDate, endDate, PageRequest.of(page, size)
                );
        return new Page<>(page,
                result.getTotalPages(),
                size,
                result.getContent());
    }

    @Override
    public Page<Smetka> findAllSmetkiWithProductsFilteredInGrad(Long idUser,
                                                                int page,
                                                                int size,
                                                                int idGrad,
                                                                int idProdavnica,
                                                                Double startPrice,
                                                                Double endPrice,
                                                                Date startDate,
                                                                Date endDate) {
        org.springframework.data.domain.Page<Smetka> result =
                this.repository.findAllByUser_IdAndProdavnica_Grad_IdGradAndProdavnica_IdProdavnicaAndVkupenPrometIsBetweenAndDatumIsBetweenOrderByDatumDesc(
                        idUser, idGrad, idProdavnica, startPrice, endPrice, startDate, endDate, PageRequest.of(page, size)
                );
        return new Page<>(page,
                result.getTotalPages(),
                size,
                result.getContent());
    }

    @Override
    public Page<Smetka> findAllSmetkiWithProductsFilteredInGrad(Long idUser,
                                                                int page,
                                                                int size,
                                                                int idGrad,
                                                                Double startPrice,
                                                                Double endPrice,
                                                                Date startDate,
                                                                Date endDate) {
        org.springframework.data.domain.Page<Smetka> result =
                this.repository.findAllByUser_IdAndProdavnica_Grad_IdGradAndVkupenPrometIsBetweenAndDatumIsBetweenOrderByDatumDesc(
                        idUser, idGrad, startPrice, endPrice, startDate, endDate, PageRequest.of(page, size)
                );
        return new Page<>(page,
                result.getTotalPages(),
                size,
                result.getContent());
    }

    @Override
    public Object getMinMaxForUser(Long idUser) {
        return this.repository.findMinMaxVkupenPrometForUser(idUser);
    }

    @Override
    public Double getPoslednaNedelaCeni(Long idUser, Date startDate, Date endDate) {
        return this.repository.getPoslednaNedelaCeni(idUser, startDate, endDate);
    }

    @Override
    public void remove(Smetka s) {
        this.repository.delete(s);
    }

    @Override
    public Page<Smetka> findAllSmetkiWithProductsFiltered(Long idUser,
                                                          int page,
                                                          int size,
                                                          int idGrad,
                                                          Date startDate,
                                                          Date endDate) {
        org.springframework.data.domain.Page<Smetka> result =
                this.repository.findAllByUser_IdAndProdavnica_Grad_IdGradAndDatumIsBetweenOrderByDatumDesc(
                        idUser, idGrad, startDate, endDate, PageRequest.of(page, size)
                );

        return new Page<>(page,
                result.getTotalPages(),
                size,
                result.getContent());
    }

    @Override
    public Page<Smetka> findAllSmetkiWithProductsFilteredEP(Long idUser,
                                                            int page,
                                                            int size,
                                                            Date startDate,
                                                            Date endDate) {
        org.springframework.data.domain.Page<Smetka> result =
               this.repository.findAllByUser_IdAndDatumIsBetweenOrderByDatumDesc(idUser, startDate, endDate, PageRequest.of(page, size));

        return new Page<>(page,
                result.getTotalPages(),
                size,
                result.getContent());
    }

}
