package com.myreceipts.myreceipts.model;

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
@Table(name = "proizvodi_na_smetki"
        , schema = "project")
public class ProizvodiNaSmetka implements Serializable {

    @EmbeddedId
    private ProizvodiNaSmetkaId proizvodiNaSmetkaId;

    @ManyToOne
    @MapsId("id_proizvod")
    @JoinColumn(name = "id_proizvod")
    private Proizvod proizvod;

    @ManyToOne
    @MapsId("id_smetka")
    @JoinColumn(name = "id_smetka")
    private Smetka smetka;

    @Column(name = "cena")
    private Float cena;

    @Column(name = "kolichina")
    private Float kolichina;

}
