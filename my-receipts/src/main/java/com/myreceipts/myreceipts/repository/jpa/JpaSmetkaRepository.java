package com.myreceipts.myreceipts.repository.jpa;

import com.myreceipts.myreceipts.model.Smetka;
import com.myreceipts.myreceipts.model.dto.UserMinMaxSmetkDTO;
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

//    Page<Smetka> findAllByUser_IdAndProdavnica_Grad_IdGradAndProdavnica_IdProdavnicaAndVkupenPrometIsBetweenAndDatumIsBetween(
//            Long idUser, int idGrad, int idProdavnica, Double startPrice, Double endPrice, Date startDate, Date endDate, Pageable req
//    );

    Page<Smetka> findAllByUser_IdAndProdavnica_IdProdavnicaOrderByDatumDesc(Long idUser,
                                                            Integer idProdavnica,
                                                            Pageable req);

    Page<Smetka> findAllByUser_IdAndProdavnica_Grad_IdGradAndProdavnica_IdProdavnicaAndVkupenPrometIsGreaterThanEqualAndDatumIsBetweenOrderByDatumDesc(
            Long idUser,
            int idGrad,
            int idProdavnica,
            Double startPrice,
            Date startDate,
            Date endDate,
            Pageable req);

    Page<Smetka> findAllByUser_IdAndProdavnica_Grad_IdGradAndVkupenPrometBetweenAndDatumBetweenOrderByDatumDesc(
            Long idUser,
            int idGrad,
            Double startPrice,
            Double endPrice,
            Date startDate,
            Date endDate,
            Pageable req);

    Page<Smetka> findAllByUser_IdAndProdavnica_Grad_IdGradAndProdavnica_IdProdavnicaAndVkupenPrometIsLessThanEqualAndDatumIsBetweenOrderByDatumDesc (
            Long idUser,
            int idGrad,
            int idProdavnica,
            Double endPrice,
            Date startDate,
            Date endDate,
            Pageable req);

    Page<Smetka> findAllByUser_IdAndProdavnica_Grad_IdGradAndVkupenPrometIsGreaterThanEqualAndDatumIsBetweenOrderByDatumDesc(
            Long idUser,
            int idGrad,
            Double startPrice,
            Date startDate,
            Date endDate,
            Pageable req);

    Page<Smetka> findAllByUser_IdAndProdavnica_Grad_IdGradAndVkupenPrometIsLessThanEqualAndDatumIsBetweenOrderByDatumDesc(
            Long idUser,
            int idGrad,
            Double endPrice,
            Date startDate,
            Date endDate,
            Pageable req);

    Page<Smetka> findAllByUser_IdAndProdavnica_Grad_IdGradAndProdavnica_IdProdavnicaAndDatumIsBetweenOrderByDatumDesc(
            Long idUser,
            int idGrad,
            int idProdavnica,
            Date startDate,
            Date endDate,
            Pageable req);

    Page<Smetka> findAllByUser_IdAndProdavnica_Grad_IdGradAndDatumIsBetweenOrderByDatumDesc(Long idUser,
                                                                                        int idGrad,
                                                                                        Date startDate,
                                                                                        Date endDate,
                                                                                        Pageable req);

    Page<Smetka> findAllByUser_IdAndDatumIsBetweenOrderByDatumDesc(Long idUser,
                                                               Date startDate,
                                                               Date endDate,
                                                               Pageable req);

    Page<Smetka> findAllByUser_IdAndVkupenPrometIsGreaterThanEqualAndDatumIsBetweenOrderByDatumDesc(Long idUser,
                                                                                                Double startPrice,
                                                                                                Date startDate,
                                                                                                Date endDate,
                                                                                                Pageable req);

    Page<Smetka> findAllByUser_IdAndVkupenPrometIsLessThanEqualAndDatumIsBetweenOrderByDatumDesc(Long idUser,
                                                                                             Double endPrice,
                                                                                             Date startDate,
                                                                                             Date endDate,
                                                                                             Pageable req);

    Page<Smetka> findAllByUser_IdAndVkupenPrometIsBetweenAndDatumIsBetweenOrderByDatumDesc(Long idUser,
                                                                                       Double startPrice,
                                                                                       Double endPrice,
                                                                                       Date startDate,
                                                                                       Date endDate,
                                                                                       Pageable req);

    Page<Smetka> findAllByUser_IdAndProdavnica_Firma_IdFirmaAndProdavnica_IdProdavnicaAndVkupenPrometIsBetweenAndDatumIsBetweenOrderByDatumDesc (
            Long idUser,
            int idFirma,
            int idProdavnica,
            Double startPrice,
            Double endPrice,
            Date startDate,
            Date endDate,
            Pageable req);

    Page<Smetka> findAllByUser_IdAndProdavnica_Firma_IdFirmaAndVkupenPrometIsBetweenAndDatumIsBetweenOrderByDatumDesc (
            Long idUser,
            int idFirma,
            Double startPrice,
            Double endPrice,
            Date startDate,
            Date endDate,
            Pageable req);

    Page<Smetka> findAllByUser_IdAndProdavnica_Grad_IdGradAndProdavnica_IdProdavnicaAndVkupenPrometIsBetweenAndDatumIsBetweenOrderByDatumDesc(
            Long idUser,
            int idGrad,
            int idProdavnica,
            Double startPrice,
            Double endPrice,
            Date startDate,
            Date endDate,
            Pageable req);

    Page<Smetka> findAllByUser_IdAndProdavnica_Grad_IdGradAndVkupenPrometIsBetweenAndDatumIsBetweenOrderByDatumDesc (
            Long idUser,
            int idGrad,
            Double startPrice,
            Double endPrice,
            Date startDate,
            Date endDate,
            Pageable req);

    @Query(value = "select min(s.vkupen_promet) minPrice, max(s.vkupen_promet) maxPrice, min(s.datum) minDate, max(s.datum) maxDate from project.smetki as s where s.id_user=?1 ",
            nativeQuery = true)
    Object findMinMaxVkupenPrometForUser(Long idUser);

    @Query(value = "select sum(s.vkupen_promet) from project.smetki as s where s.id_user=?1 and s.datum between ?2 and ?3 ",
            nativeQuery = true)
    Double getPoslednaNedelaCeni(Long idUser, Date startDate, Date endDate);
}
