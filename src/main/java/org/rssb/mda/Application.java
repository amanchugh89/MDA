package org.rssb.mda;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;

/**
 * Created by esuchug on 27-06-2015.
 */
@SpringBootApplication
public class Application extends SpringBootServletInitializer {

    public static void main(String[] args) {
        String profile =System.getProperty("spring.profiles.active");
        if(profile == null){
            profile="dev";
        }


       new SpringApplicationBuilder(Application.class).profiles(profile).run(args);



    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {

        return application.profiles(System.getProperty("spring.profiles.active")).sources(Application.class);
    }
}
