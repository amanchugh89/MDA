package org.rssb.mda.rest;

import org.rssb.mda.entity.Details;
import org.rssb.mda.exceptions.MDAResponse;
import org.rssb.mda.exceptions.ValidationException;
import org.rssb.mda.rest.helper.DepositService;
import org.rssb.mda.rest.helper.RequestValidator;
import org.rssb.mda.rest.types.MobileDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.Consumes;
import javax.ws.rs.core.MediaType;
import java.util.List;

/**
 * Created by esuchug on 27-06-2015.
 */
@RestController
@RequestMapping(("/rest/mda"))
public class MobileDepositController {

    @Autowired
    private DepositService depositService;


    @RequestMapping(value = "/mobileDetails", method = RequestMethod.POST)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public MobileDetails insert(@ModelAttribute Details mobileDetail) throws ValidationException{

            RequestValidator.validateMobileRequest(mobileDetail);
        return  depositService.submitDetails(mobileDetail);
    }

    @RequestMapping(value = "/mobileDetails/mobile={mobile}", method = RequestMethod.GET)
    public MobileDetails fetchDetailByMobile(@PathVariable Long mobile) throws ValidationException {
       RequestValidator.validateMobile(mobile);
        return depositService.getDetailsByNo(mobile);
    }

    @RequestMapping(value = "/mobileDetails/{Id}", method = RequestMethod.GET)
    public MobileDetails fetchDetailById(@PathVariable Long Id) throws ValidationException{
        return depositService.getDetailsById(Id);
    }

    @RequestMapping(value = "/mobileDetails/name={name}", method = RequestMethod.GET)
    public MobileDetails fetchDetailByName(@PathVariable String name) throws ValidationException {
        RequestValidator.validateName(name);
        return depositService.getDetailsByName(name);
    }

    @RequestMapping(value = "/mobileDetails/altNo={altNo}", method = RequestMethod.GET)
    public MobileDetails fetchDetailByAltMobile(@PathVariable Long altNo) throws ValidationException {
        RequestValidator.validateMobile(altNo);
        return depositService.getDetailsByAltNo(altNo);
    }

}
