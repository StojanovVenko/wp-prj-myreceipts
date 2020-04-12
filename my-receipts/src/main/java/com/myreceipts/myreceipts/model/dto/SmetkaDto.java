package com.myreceipts.myreceipts.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SmetkaDto {

    private Integer idSmetka;

    private Date datum;

    private Double vkupenPromet;

    private String prodavnica;

    private String firma;

}
