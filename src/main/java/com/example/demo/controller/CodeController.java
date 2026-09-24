package com.example.demo.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
@CrossOrigin
public class CodeController {

    @GetMapping("/test")
    public String test() {
        return "Backend is working!";
    }

    @PostMapping("/run")
public String runCode(@RequestBody Map<String, String> code) {

    String html = code.get("html");
    String css = code.get("css");
    String javascript = code.get("javascript");

    System.out.println("========== CODE RECEIVED ==========");
    
    System.out.println("HTML:");
    System.out.println(html);

    System.out.println("\nCSS:");
    System.out.println(css);

    System.out.println("\nJavaScript:");
    System.out.println(javascript);

    System.out.println("===================================");

    return "HTML, CSS and JavaScript received successfully!";
}
}
