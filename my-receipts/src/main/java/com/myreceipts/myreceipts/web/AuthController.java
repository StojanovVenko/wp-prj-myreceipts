package com.myreceipts.myreceipts.web;

import com.myreceipts.myreceipts.model.Role;
import com.myreceipts.myreceipts.model.RoleName;
import com.myreceipts.myreceipts.model.User;
import com.myreceipts.myreceipts.model.dto.UserDetailsDto;
import com.myreceipts.myreceipts.model.exceptions.AppException;
import com.myreceipts.myreceipts.security.payload.ApiResponse;
import com.myreceipts.myreceipts.security.payload.JwtAuthenticationResponse;
import com.myreceipts.myreceipts.security.payload.LoginRequest;
import com.myreceipts.myreceipts.security.payload.SignUpRequest;
import com.myreceipts.myreceipts.repository.RoleRepository;
import com.myreceipts.myreceipts.repository.UserRepository;
import com.myreceipts.myreceipts.security.CurrentUser;
import com.myreceipts.myreceipts.security.JwtTokenProvider;
import com.myreceipts.myreceipts.security.UserPrincipal;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/auth", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtTokenProvider tokenProvider;

    public AuthController(AuthenticationManager authenticationManager,
                          UserRepository userRepository,
                          RoleRepository roleRepository,
                          PasswordEncoder passwordEncoder,
                          JwtTokenProvider tokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        if(userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        // Creating user's account
        User user = new User(signUpRequest.getName(), signUpRequest.getUsername(),
                signUpRequest.getEmail(), signUpRequest.getPassword());

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("User Role not set."));

        user.setRoles(Collections.singleton(userRole));

        User result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }

    @GetMapping("/me")
    public UserDetailsDto getUserDetails(@CurrentUser UserPrincipal userPrincipal) {
        UserDetailsDto dto = new UserDetailsDto();
        dto.setMail(userPrincipal.getEmail());
        dto.setName(userPrincipal.getName());
        dto.setUsername(userPrincipal.getUsername());
        return dto;
    }

    @PostMapping("/update")
    @PreAuthorize("isAuthenticated()")
    @Transactional
    public UserDetailsDto updateUser(@CurrentUser UserPrincipal userPrincipal,
                                     @RequestBody UserDetailsDto req){
        Optional<User> user = this.userRepository.findById(userPrincipal.getId());
        if(user.isPresent()){
            User u = user.get();
            u.setName(req.getName());
            u.setUsername(req.getUsername());
            u.setEmail(req.getMail());
            this.userRepository.save(u);
        }
        return req;
    }

}
