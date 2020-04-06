package com.myreceipts.myreceipts.repository;

import com.myreceipts.myreceipts.model.Grad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface GradoviRepository extends JpaRepository<Grad, Integer> {

}
