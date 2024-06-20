package com.eduland.eduland.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.eduland.eduland.Model.Video;
import com.eduland.eduland.Service.VideoService;

@RestController
public class YouTube {
    // @Autowired
    // VideoService videoService;

    // private List storedMovies;

    // @PostMapping("/")
    // public List searchMovie(@RequestBody Video  movie){
    //     try{
    //         storedMovies = videoService.searchMovie(movie.getTitle());
    //         return storedMovies;
    //     }
    //     catch (Exception e){
    //         return null;
    //     }
    // }

    // @GetMapping("/Movies")
    // public List getMovies(){
    //     return storedMovies;
    // }

    @GetMapping("/hello")
    public String Hell(){
        return "Hello";
    }
}
