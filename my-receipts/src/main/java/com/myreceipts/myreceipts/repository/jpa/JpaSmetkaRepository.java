package com.myreceipts.myreceipts.repository.jpa;

import com.myreceipts.myreceipts.model.Smetka;
import com.myreceipts.myreceipts.model.dto.SmetkaDto;
import com.myreceipts.myreceipts.model.vm.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

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

}
