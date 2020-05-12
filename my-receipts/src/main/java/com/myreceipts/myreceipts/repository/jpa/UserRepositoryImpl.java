package com.myreceipts.myreceipts.repository.jpa;

import com.myreceipts.myreceipts.model.User;
import com.myreceipts.myreceipts.repository.UserRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UserRepositoryImpl implements UserRepository {

    private final JpaUserRepository userRepository;

    public UserRepositoryImpl(JpaUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return this.userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> findByUsernameOrEmail(String username, String email) {
        return this.userRepository.findByUsernameOrEmail(username, email);
    }

    @Override
    public List<User> findByIdIn(List<Long> userIds) {
        return this.userRepository.findByIdIn(userIds);
    }

    @Override
    public boolean existsByUsername(String username) {
        return this.userRepository.existsByUsername(username);
    }

    @Override
    public boolean existsByEmail(String email) {
        return this.userRepository.existsByEmail(email);
    }

    @Override
    public User save(User user) {
        return this.userRepository.save(user);
    }

    @Override
    public Optional<User> findById(Long id) {
        return this.userRepository.findById(id);
    }
}
