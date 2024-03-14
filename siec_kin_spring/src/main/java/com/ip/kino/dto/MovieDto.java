package com.ip.kino.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MovieDto {
    private String title;
    private String description;
    private String director;
    private String picture_url;
    private String poster_url;
    private LocalDate release_date;
    private Long duration;
    private Long categoryId;
}
