package com.myreceipts.myreceipts.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "gradovi",
        uniqueConstraints = @UniqueConstraint(columnNames = "ime_grad"),
        schema = "project")
public class Grad implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_grad", nullable = false)
    private Integer idGrad;

    @Column(name = "ime_grad", nullable = false)
    private String ime;

    @JsonIgnore
    @OneToMany(mappedBy = "grad")
    private List<Prodavnica> prodavnicaList;

    @JsonIgnore
    @OneToMany(mappedBy = "grad")
    private List<Firma> firmaList;

}
