package com.myreceipts.myreceipts.repository.jpa;

import com.myreceipts.myreceipts.model.Smetka;
import com.myreceipts.myreceipts.model.vm.Page;
import com.myreceipts.myreceipts.repository.SmetkaRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

@Repository
public class SmetkaRepositoryImpl implements SmetkaRepository {

    private final JpaSmetkaRepository repository;

    public SmetkaRepositoryImpl(JpaSmetkaRepository repository) {
        this.repository = repository;
    }

    @Override
    public Page<Smetka> getAllSmetkiWithProducts(Integer page, Integer size) {
        org.springframework.data.domain.Page<Smetka> result = this.repository.findAll(PageRequest.of(page, size));
        return new Page<>(page,
                result.getTotalPages(),
                size,
                result.getContent());
    }

}
