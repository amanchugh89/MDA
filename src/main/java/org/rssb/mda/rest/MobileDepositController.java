package org.rssb.mda.rest;

import org.rssb.mda.codes.MDAResponse;
import org.rssb.mda.entity.Details;
import org.rssb.mda.repository.DetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.Consumes;
import javax.ws.rs.core.MediaType;

/**
 * Created by esuchug on 27-06-2015.
 */
@RestController
@RequestMapping(("/rest/mda"))
public class MobileDepositController {

    @Autowired
    private DetailsRepo detailsRepo;


    @RequestMapping(value = "/mobileDetails", method = RequestMethod.POST)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public MDAResponse insert(@ModelAttribute Details mobileDetail) {

        detailsRepo.save(mobileDetail);
        return MDAResponse.OK;
    }

    @RequestMapping(value = "/mobileDetails/mobile={mobile}", method = RequestMethod.GET)
    public Details fetchDetailByMobile(@PathVariable Long mobile) {
        System.out.println(mobile);
        System.out.println(detailsRepo.findByMobile(mobile));
        return detailsRepo.findByMobile(mobile);
    }

    @RequestMapping(value = "/mobileDetails/{Id}", method = RequestMethod.GET)
    public Details fetchDetailById(@PathVariable Long Id) {
        System.out.println(Id);
        System.out.println(detailsRepo.findOne(Id));
        return detailsRepo.findOne(Id);
    }



}
