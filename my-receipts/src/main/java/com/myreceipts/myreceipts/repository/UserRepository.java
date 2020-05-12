package com.myreceipts.myreceipts.repository;

import com.myreceipts.myreceipts.model.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository {

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    Optional<User> findByUsernameOrEmail(String username, String email);

    List<User> findByIdIn(List<Long> userIds);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    User save(User user);

    Optional<User> findById(Long id);
}
