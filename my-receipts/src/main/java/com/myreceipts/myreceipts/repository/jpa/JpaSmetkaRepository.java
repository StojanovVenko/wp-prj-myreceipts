package com.myreceipts.myreceipts.repository.jpa;

import com.myreceipts.myreceipts.model.Smetka;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.awt.*;
import java.util.Date;
import java.util.List;

public interface JpaSmetkaRepository extends JpaRepository<Smetka, Integer> {

    @Query(value = "select s.id_smetka, s.datum, s.vkupen_promet, p.ime as prodavnica, f.ime as firma from project.smetki as s " +
            "inner join project.prodavnici as p on p.id_prodavnica=s.id_prodavnica " +
            "inner join project.firmi as f on f.id_firma = p.id_firma ", nativeQuery = true)
    List<Object> findAllDto();

    @Query(value = "select q1.*, pns.kolichina, pns.cena, pr.ime proizvod, pns.id_proizvod from ( " +
            "select s.id_smetka, s.datum, s.vkupen_promet, p.ime as imep, p.id_prodavnica, f.ime imef, f.id_firma " +
            "from project.smetki as s " +
            "inner join project.prodavnici as p on p.id_prodavnica=s.id_prodavnica " +
            "inner join project.firmi as f on f.id_firma = p.id_firma " +
            "where s.id_smetka =?1 " +
            ") as q1 " +
            "natural join project.proizvodi_na_smetki as pns " +
            "inner join project.proizvodi as pr on pr.id_proizvod=pns.id_proizvod ", nativeQuery = true)
    List<Object> findSmetkaInfo(Integer id);

    Page<Smetka> findAllByProdavnica_Grad_IdGradAndProdavnica_IdProdavnicaAndVkupenPrometIsBetweenAndDatumIsBetween(
            int idGrad, int idProdavnica, Double startPrice, Double endPrice, Date startDate, Date endDate, Pageable req
    );

    Page<Smetka> findAllByProdavnica_IdProdavnica(Integer idProdavnica, Pageable req);

    Page<Smetka> findAllByProdavnica_Grad_IdGradAndProdavnica_IdProdavnicaAndVkupenPrometIsGreaterThanEqualAndDatumIsBetween(
            int idGrad, int idProdavnica, Double startPrice, Date startDate, Date endDate, Pageable req
    );

    Page<Smetka> findAllByProdavnica_Grad_IdGradAndVkupenPrometBetweenAndDatumBetween(
            int idGrad, Double startPrice, Double endPrice, Date startDate, Date endDate, Pageable req
        );

    Page<Smetka> findAllByProdavnica_Grad_IdGradAndProdavnica_IdProdavnicaAndVkupenPrometIsLessThanEqualAndDatumIsBetween (
    int idGrad, int idProdavnica, Double endPrice, Date startDate, Date endDate, Pageable req
            );

    Page<Smetka> findAllByProdavnica_Grad_IdGradAndVkupenPrometIsGreaterThanEqualAndDatumIsBetween(
    int idGrad, Double startPrice, Date startDate, Date endDate, Pageable req
            );

    Page<Smetka> findAllByProdavnica_Grad_IdGradAndVkupenPrometIsLessThanEqualAndDatumIsBetween(
            int idGrad, Double endPrice,Date startDate, Date endDate, Pageable req
        );

    Page<Smetka> findAllByProdavnica_Grad_IdGradAndProdavnica_IdProdavnicaAndDatumIsBetween(
        int idGrad, int idProdavnica, Date startDate, Date endDate, Pageable req
            );

    Page<Smetka> findAllByProdavnica_Grad_IdGradAndDatumIsBetween(
            int idGrad, Date startDate, Date endDate, Pageable req
    );

    Page<Smetka> findAllByDatumIsBetween(
        Date startDate, Date endDate, Pageable req
            );

    Page<Smetka> findAllByVkupenPrometIsGreaterThanEqualAndDatumIsBetween(
            Double startPrice, Date startDate, Date endDate, Pageable req
    );

    Page<Smetka> findAllByVkupenPrometIsLessThanEqualAndDatumIsBetween(
            Double endPrice, Date startDate, Date endDate, Pageable req
    );

    Page<Smetka> findAllByVkupenPrometIsBetweenAndDatumIsBetween(
            Double startPrice, Double endPrice, Date startDate, Date endDate, Pageable req
    );

    Page<Smetka> findByProdavnica_Firma_IdFirmaAndProdavnica_IdProdavnicaAndVkupenPrometIsBetweenAndDatumIsBetween (
            int idFirma, int idProdavnica, Double startPrice, Double endPrice, Date startDate, Date endDate, Pageable req
    );

    Page<Smetka> findAllByProdavnica_Firma_IdFirmaAndVkupenPrometIsBetweenAndDatumIsBetween (
            int idFirma, Double startPrice, Double endPrice, Date startDate, Date endDate, Pageable req
    );

    Page<Smetka> findByProdavnica_Grad_IdGradAndProdavnica_IdProdavnicaAndVkupenPrometIsBetweenAndDatumIsBetween(
            int idGrad, int idProdavnica, Double startPrice, Double endPrice, Date startDate, Date endDate, Pageable req
    );

    Page<Smetka> findAllByProdavnica_Grad_IdGradAndVkupenPrometIsBetweenAndDatumIsBetween (
            int idGrad, Double startPrice, Double endPrice, Date startDate, Date endDate, Pageable req
    );
}
