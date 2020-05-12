package com.myreceipts.myreceipts.repository.jpa;

import com.myreceipts.myreceipts.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JpaUserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    Optional<User> findByUsernameOrEmail(String username, String email);

    List<User> findByIdIn(List<Long> userIds);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

}
