package com.myreceipts.myreceipts.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.annotation.sql.DataSourceDefinitions;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailsDto {

    String name;

    String username;

    String mail;

}
