package com.myreceipts.myreceipts.repository;

import com.myreceipts.myreceipts.model.Role;
import com.myreceipts.myreceipts.model.RoleName;

import java.util.Optional;

public interface RoleRepository {

    Optional<Role> findByName(RoleName roleName);

}
