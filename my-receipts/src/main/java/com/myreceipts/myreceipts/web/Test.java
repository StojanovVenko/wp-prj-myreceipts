package com.myreceipts.myreceipts.web;

import com.myreceipts.myreceipts.repository.ProizvodNaSmetkaRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(path = "/api/test", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)

public class Test {

    public final ProizvodNaSmetkaRepository repository;

    public Test(ProizvodNaSmetkaRepository proizvodNaSmetkaRepository) {
        this.repository = proizvodNaSmetkaRepository;
    }


}
