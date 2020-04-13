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
@Table(name = "proizvodi"
        , uniqueConstraints = @UniqueConstraint(columnNames = "ime")
        , schema = "project")
public class Proizvod implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_proizvod", nullable = false, unique = true)
    private Integer idProizvod;

    @Column(name = "ime", nullable = false)
    private String ime;

}
