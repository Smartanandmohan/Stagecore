package com.esports.dto;

import lombok.Data;
import java.util.List;

@Data
public class RegistrationRequest {
    private String teamName;
    private List<String> playerInGameIds;
}
