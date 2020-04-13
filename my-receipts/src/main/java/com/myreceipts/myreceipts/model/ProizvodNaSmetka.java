package com.myreceipts.myreceipts.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "proizvodi_na_smetki",
        uniqueConstraints = @UniqueConstraint(columnNames = {"id_proizvod", "id_smetka", "cena"})
        , schema = "project")
public class ProizvodNaSmetka implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_proizvod_na_smetka", nullable = false, unique = true)
    private Integer proizvodNaSmetkaId;

    @Column(name = "cena")
    private Float cena;

    @Column(name = "kolichina")
    private Float kolichina;

    @ManyToOne
//    @MapsId("id_proizvod")
    @JoinColumn(name = "id_proizvod", referencedColumnName = "id_proizvod")
    private Proizvod proizvod;

    @JsonIgnore
    @ManyToOne
//    @MapsId("id_smetka")
    @JoinColumn(name = "id_smetka", referencedColumnName = "id_smetka")
    private Smetka smetka;

}
