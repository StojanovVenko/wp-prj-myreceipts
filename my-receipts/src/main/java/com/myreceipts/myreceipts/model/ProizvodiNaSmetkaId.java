package com.myreceipts.myreceipts.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class ProizvodiNaSmetkaId implements Serializable {

    @Column(name = "id_proizvod")
    private Integer idProizvod;

    @Column(name = "id_smetka")
    private Integer idSmetka;

}
