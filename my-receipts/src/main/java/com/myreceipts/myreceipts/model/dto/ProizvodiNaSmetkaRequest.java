package com.myreceipts.myreceipts.model.dto;

import com.myreceipts.myreceipts.model.ProizvodNaSmetka;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProizvodiNaSmetkaRequest {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ProizvodInSmetka{

        private Integer idProizvod;

        private Float kolichina;

        private Float cena;

    }

    private Integer idSmetka;

    private List<ProizvodInSmetka> listProizvodi;

}
