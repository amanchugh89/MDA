package org.rssb.mda.rest;

import org.rssb.mda.codes.MDAResponse;
import org.rssb.mda.entity.MobileDetail;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by esuchug on 27-06-2015.
 */
@RestController
@RequestMapping(("/rest/mda"))
public class MobileDepositController {



    @RequestMapping(value ="/insert",method= RequestMethod.POST)
    public MDAResponse insert(@RequestBody MobileDetail mobileDetail){

        System.out.println(mobileDetail);
        return MDAResponse.OK;
    }



}
