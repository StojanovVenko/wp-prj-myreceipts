package com.myreceipts.myreceipts.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GeneratorType;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "prodavnici",
        uniqueConstraints = @UniqueConstraint(columnNames = {"adresa", "ime"}),
        schema = "project")
public class Prodavnica implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_prodavnica", nullable = false, unique = true)
    private Integer idProdavnica;

    @Column(name = "ime")
    private String ime;

    @Column(name = "adresa")
    private String adresa;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_grad", nullable = false)
    private Grad grad;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_firma", nullable = false)
    private Firma firma;

    @JsonIgnore
    @OneToMany(mappedBy = "prodavnica")
    private List<Smetka> smetkaList;

}
