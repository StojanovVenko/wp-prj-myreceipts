package com.myreceipts.myreceipts.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserSummary {

    private Long id;

    private String username;

    private String name;

    private String role;

}
