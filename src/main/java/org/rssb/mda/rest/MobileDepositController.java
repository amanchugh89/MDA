package org.rssb.mda.rest;

import org.rssb.mda.entity.Details;
import org.rssb.mda.entity.Entry;
import org.rssb.mda.exceptions.MDAResponse;
import org.rssb.mda.exceptions.ValidationException;
import org.rssb.mda.rest.helper.DepositService;
import org.rssb.mda.rest.helper.EntryService;
import org.rssb.mda.rest.helper.RequestValidator;
import org.rssb.mda.rest.types.MobileDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.Consumes;
import javax.ws.rs.core.MediaType;
import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

/**
 * Created by esuchug on 27-06-2015.
 */
@RestController
@RequestMapping(("/rest/mda"))
public class MobileDepositController {

    @Autowired
    private DepositService depositService;

    @Autowired
    private EntryService entryService;

    @Value("${mypath}")
    private String uploadDir ;


    private void printTime(String sten) {
        System.out.println(System.currentTimeMillis() + "-----Time for " + sten);
    }

    @RequestMapping(value = "/mobileDetails", method = RequestMethod.POST)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Details insert(@ModelAttribute Details mobileDetail) throws ValidationException {
        printTime("validat start");
        RequestValidator.validateMobileRequest(mobileDetail);
        printTime("valid end");
        return depositService.submitDetails(mobileDetail);
    }

    @RequestMapping(value = "/mobileDetails/mobile={mobile}", method = RequestMethod.GET)
    public Details fetchDetailByMobile(@PathVariable Long mobile) throws ValidationException {
        RequestValidator.validateMobile(mobile);
        return depositService.getDetailsByNo(mobile);
    }

    @RequestMapping(value = "/mobileDetails/{Id}", method = RequestMethod.GET)
    public Details fetchDetailById(@PathVariable Long Id) throws ValidationException {
        return depositService.getDetailsById(Id);
    }

    @RequestMapping(value = "/mobileDetails/name={name}", method = RequestMethod.GET)
    public List<Details> fetchDetailByName(@PathVariable String name) throws ValidationException {
        RequestValidator.validateName(name);
        return depositService.getDetailsByName(name);
    }

    @RequestMapping(value = "/mobileDetails/altNo={altNo}", method = RequestMethod.GET)
    public List<Details> fetchDetailByAltMobile(@PathVariable Long altNo) throws ValidationException {
        RequestValidator.validateMobile(altNo);
        return depositService.getDetailsByAltNo(altNo);
    }

    @RequestMapping(value = "/mobileDetails/signIn", method = RequestMethod.POST)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Entry signIn(@ModelAttribute Entry entry) throws ValidationException {
        return entryService.signIn(entry);
    }

    @RequestMapping(value = "/mobileDetails/signOut", method = RequestMethod.POST)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Entry signOut(@RequestParam Long detailsId,@RequestParam  int tokenId) throws ValidationException {
        return entryService.signOut(detailsId,tokenId);
    }

    @RequestMapping(value = "/mobileDetails/history/{detailsId}", method = RequestMethod.POST)
    public MobileDetails signOut(@PathVariable Long detailsId) throws ValidationException {
        return entryService.history(detailsId);
    }

    @RequestMapping(value = "/mobileDetails/image={image}", method = RequestMethod.GET)
    public String getImage(@PathVariable String image) throws ValidationException {

        if (uploadDir != null) {
            try {
                byte[] encoded = Files.readAllBytes(Paths.get(uploadDir+ File.separator+image));
                return new String(encoded, Charset.defaultCharset());
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else
            throw new ValidationException(MDAResponse.NO_RESPONSE);
        return "";

    }

    @RequestMapping(value = "/mobileDetails/pendingWithdrawal/{tokenId}", method = RequestMethod.POST)
    public Details getPendingSignOut(@PathVariable Long tokenId) throws ValidationException {
        Entry e =entryService.getEntryByToken(tokenId);
        return e!= null ?depositService.getDetailsById(e.getDetailsId()) : null;
    }

}
