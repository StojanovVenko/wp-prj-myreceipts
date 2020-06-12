package com.myreceipts.myreceipts.repository.jpa;

import com.myreceipts.myreceipts.model.ProizvodNaSmetka;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface JpaProizvodNaSmetkaRepository extends JpaRepository<ProizvodNaSmetka, Integer> {

    public List<ProizvodNaSmetka> findAllBySmetka_IdSmetka(Integer idSmetka);

    @Query(value = "select p.id_proizvod, p.ime, sum(pns.kolichina) kolichina, sum(pns.kolichina * pns.cena) vkupno from ( " +
            "select ss.id_smetka, ss.id_prodavnica from ( " +
            "select sss.id_smetka, sss.id_prodavnica from project.smetki as sss " +
            "where sss.id_user= ?1 " +
            "and sss.vkupen_promet between ?2 and ?3 " +
            "and sss.datum between ?4 and ?5 " +
            ") as ss " +
            "inner join project.prodavnici as p on p.id_prodavnica = ss.id_prodavnica " +
            "where p.id_grad = ?6 " +
            ") as s " +
            "inner join project.proizvodi_na_smetki as pns on pns.id_smetka=s.id_smetka " +
            "inner join project.proizvodi as p on p.id_proizvod = pns.id_proizvod " +
            "group by p.id_proizvod, p.ime " +
            "order by p.ime ",
            nativeQuery = true)
    public List<Object> getStatsForProductsInCityForUser(Long idUser, Double minPrice, Double maxPrice, Date startDate, Date endDate, Integer idGrad);

    @Query(value = "select p.id_proizvod, p.ime, sum(pns.kolichina) kolichina, sum(pns.kolichina * pns.cena) vkupno from ( " +
            "select  ss.id_smetka, ss.id_prodavnica from ( " +
            "select sss.id_smetka, sss.id_prodavnica from project.smetki as sss " +
            "where sss.id_user= ?1 " +
            "and sss.vkupen_promet between ?2 and ?3 " +
            "and sss.datum between ?4 and ?5 " +
            ") as ss " +
            "inner join project.prodavnici as p on p.id_prodavnica = ss.id_prodavnica " +
            "where p.id_firma = ?6 " +
            ") as s " +
            "inner join project.proizvodi_na_smetki as pns on pns.id_smetka=s.id_smetka " +
            "inner join project.proizvodi as p on p.id_proizvod = pns.id_proizvod " +
            "group by p.id_proizvod, p.ime " +
            "order by p.ime ",
            nativeQuery = true)
    public List<Object> getStatsForProductsInFirmForUser(Long idUser, Double minPrice, Double maxPrice, Date startDate, Date endDate, Integer idFirma);

    @Query(value = "select p.id_proizvod, p.ime, sum(pns.kolichina) kolichina, sum(pns.kolichina * pns.cena) vkupno from ( \n" +
            "select ss.id_smetka from ( " +
            "select sss.id_smetka from project.smetki as sss " +
            "where sss.id_user= ?1 and sss.id_prodavnica = ?6 " +
            "and sss.vkupen_promet between ?2 and ?3 " +
            "and sss.datum between ?4 and ?5 " +
            ") as ss " +
            ") as s " +
            "inner join project.proizvodi_na_smetki as pns on pns.id_smetka=s.id_smetka " +
            "inner join project.proizvodi as p on p.id_proizvod = pns.id_proizvod " +
            "group by p.id_proizvod, p.ime " +
            "order by p.ime ",
            nativeQuery = true)
    public List<Object> getStatsForProductsInMarketForUser(Long idUser, Double minPrice, Double maxPrice, Date startDate, Date endDate, Integer idProdavnica );

    @Query(value = "select p.id_proizvod, p.ime, sum(pns.kolichina) kolichina, sum(pns.kolichina * pns.cena) vkupno from ( " +
            "select ss.id_smetka from ( " +
            "select sss.id_smetka from project.smetki as sss " +
            "where sss.id_user= ?1 " +
            "and sss.vkupen_promet between ?2 and ?3 " +
            "and sss.datum between ?4 and ?5 " +
            ") as ss " +
            ") as s " +
            "inner join project.proizvodi_na_smetki as pns on pns.id_smetka=s.id_smetka " +
            "inner join project.proizvodi as p on p.id_proizvod = pns.id_proizvod " +
            "group by p.id_proizvod, p.ime " +
            "order by p.ime ",
            nativeQuery = true)
    public List<Object> getStatsForProductsForUser(Long idUser, Double minPrice, Double maxPrice, Date startDate, Date endDate);

}
