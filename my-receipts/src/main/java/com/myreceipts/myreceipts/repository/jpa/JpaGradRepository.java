package com.myreceipts.myreceipts.repository.jpa;

import com.myreceipts.myreceipts.model.Grad;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaGradRepository extends JpaRepository<Grad, Integer> {
}
