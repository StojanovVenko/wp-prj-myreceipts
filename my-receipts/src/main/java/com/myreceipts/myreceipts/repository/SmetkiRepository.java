package com.myreceipts.myreceipts.repository;

import com.myreceipts.myreceipts.model.Smetka;
import com.myreceipts.myreceipts.model.vm.Page;

public interface SmetkiRepository {

    Page<Smetka> getAllSmetkiWithProducts(Integer page, Integer size);

}
