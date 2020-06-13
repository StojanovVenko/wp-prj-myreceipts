package com.myreceipts.myreceipts.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SmetkaEditDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ProizvodInSmetka{

        private Integer idProizvod;

        private String imeProizvod;

        private Float kolichina;

        private Float cena;

    }

    private Integer idSmetka;

    private Float vkupnoDDV;

    private String danochenBroj;

    private String ddvBroj;

    private List<ProizvodInSmetka> listProizvodi;

}
