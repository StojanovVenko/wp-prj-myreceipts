package com.myreceipts.myreceipts.model.dto;

import lombok.Data;

import javax.annotation.sql.DataSourceDefinitions;

@Data
public class UserDetailsDto {

    String name;

    String username;

    String mail;

}
