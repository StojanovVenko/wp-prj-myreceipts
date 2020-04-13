package com.myreceipts.myreceipts.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "smetki"
        , schema = "project")
public class Smetka implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_smetka", nullable = false, unique = true)
    private Integer idSmetka;

    @Column(name = "vkupen_promet", nullable = false)
    private Double vkupenPromet;

    @Column(name = "vkupno_ddv")
    private Float vkupnoDDV;

    @Temporal(TemporalType.DATE)
    @Column(name = "datum", nullable = false, length = 13)
    private Date datum;

    @Column(name = "danochen_broj")
    private String danochenBroj;

    @Column(name = "ddv_broj")
    private String ddvBroj;

    @Column(name = "pregledana")
    private Integer pregledana;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_prodavnica", nullable = false)
    private Prodavnica prodavnica;

}
