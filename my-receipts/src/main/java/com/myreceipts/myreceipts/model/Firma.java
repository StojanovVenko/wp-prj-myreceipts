package com.myreceipts.myreceipts.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "firmi",
        uniqueConstraints = @UniqueConstraint(columnNames = {"ime", "adresa"}),
        schema = "project")
public class Firma implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_firma", nullable = false, unique = true)
    private Integer idFirma;

    @Column(name = "ime", nullable = false)
    private String ime;

    @Column(name = "adresa", nullable = false)
    private String adresa;

    @OneToMany(mappedBy = "firma")
    private List<Prodavnica> prodavnicaList;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_grad", nullable = false)
    private Grad grad;

}
