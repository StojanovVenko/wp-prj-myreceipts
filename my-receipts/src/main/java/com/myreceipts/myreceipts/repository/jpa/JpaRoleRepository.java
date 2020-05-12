package com.myreceipts.myreceipts.repository.jpa;

import com.myreceipts.myreceipts.model.Role;
import com.myreceipts.myreceipts.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JpaRoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(RoleName roleName);

}
