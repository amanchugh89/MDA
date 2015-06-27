package org.rssb.mda.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

//@Controller
public class HomeController {

    @RequestMapping(value = "/mda", method = RequestMethod.GET)
    public ModelAndView hello() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("mda");

        String str = "MDA";
        mav.addObject("message", str);

        return mav;
    }

}