package com.coffeeshop.controller;

import com.coffeeshop.model.entity.Example;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/test")
public class TestController {


    @GetMapping("/example")
    public List<Example> getExamples() {

        return Stream.of(
                Example.builder()
                        .id(1L)
                        .name("abc")
                        .build(),
                Example.builder()
                        .id(2L)
                        .name("zyx")
                        .build()
        ).collect(Collectors.toList());
    }
}
