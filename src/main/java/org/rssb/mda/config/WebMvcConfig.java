package org.rssb.mda.config;


import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

//@Configuration
//@EnableWebMvc
public class WebMvcConfig extends WebMvcConfigurerAdapter{




    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/mda/deposit").setViewName("mobileDeposit");
        registry.addViewController("/mda/withdraw").setViewName("mobileWithdrawal");
        registry.addViewController("/mda/register").setViewName("mobileRegistration");

    }




}