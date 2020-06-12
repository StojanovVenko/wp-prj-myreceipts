package com.myreceipts.myreceipts.repository.impl;

import com.myreceipts.myreceipts.model.Role;
import com.myreceipts.myreceipts.model.RoleName;
import com.myreceipts.myreceipts.repository.RoleRepository;
import com.myreceipts.myreceipts.repository.jpa.JpaRoleRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class RoleRepositoryImpl implements RoleRepository {

    private final JpaRoleRepository roleRepository;

    public RoleRepositoryImpl(JpaRoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Optional<Role> findByName(RoleName roleName) {
        return this.roleRepository.findByName(roleName);
    }
}
