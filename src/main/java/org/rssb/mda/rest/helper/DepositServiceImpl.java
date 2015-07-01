package org.rssb.mda.rest.helper;

import org.rssb.mda.entity.Details;
import org.rssb.mda.entity.Entry;
import org.rssb.mda.repository.DetailsRepo;
import org.rssb.mda.repository.EntryRepo;
import org.rssb.mda.rest.types.MobileDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by esuchug on 30-06-2015.
 */
@Service
public class DepositServiceImpl implements DepositService {

    @Autowired
    private DetailsRepo detailsRepo;

    @Autowired
    private EntryRepo entryRepo;

    @Override
    public MobileDetails submitDetails(Details mobileDetails) {
        //submit detaild to db

        //save image
        //return
        return null;
    }

    @Override
    public MobileDetails getDetailsByNo(Long mobile) {
        Map<Details,List<Entry>> detailsListMap = new HashMap<>();
        MobileDetails mobileDetails = new MobileDetails(detailsListMap);
        Details details = detailsRepo.findByMobile(mobile);
        detailsListMap.put(details, entryRepo.findByDetailsId(details.getId()));
        return mobileDetails;
    }

    @Override
    public MobileDetails getDetailsById(Long Id) {
        Map<Details,List<Entry>> detailsListMap = new HashMap<>();
        MobileDetails mobileDetails = new MobileDetails(detailsListMap);
        Details details = detailsRepo.findOne(Id);
         detailsListMap.put(details, entryRepo.findByDetailsId(details.getId()));
        return mobileDetails;
    }

    @Override
    public MobileDetails getDetailsByAltNo(Long altNo) {
        Map<Details,List<Entry>> detailsListMap = new HashMap<>();
        MobileDetails mobileDetails = new MobileDetails(detailsListMap);
        List<Details> detailsList =detailsRepo.findByAlternateNumber(altNo);
        detailsList.stream().forEach((p)->  detailsListMap.put(p, entryRepo.findByDetailsId(p.getId())));
        return mobileDetails;
    }

    @Override
    public MobileDetails getDetailsByName(String name) {
        Map<Details,List<Entry>> detailsListMap = new HashMap<>();
        MobileDetails mobileDetails = new MobileDetails(detailsListMap);
        List<Details> detailsList =detailsRepo.findByName(name);
        detailsList.stream().forEach((p)->  detailsListMap.put(p, entryRepo.findByDetailsId(p.getId())));
        return mobileDetails;
    }

    @Override
    public MobileDetails updateDetail(MobileDetails detail) {
        Map<Details,List<Entry>> detailsListMap = new HashMap<>();
        MobileDetails mobileDetails = new MobileDetails(detailsListMap);
        detail.getDetailsListMap().keySet().parallelStream().forEach((p)-> {
                   p= detailsRepo.save(p);
detail.getDetailsListMap().put(p,entryRepo.findByDetailsId(p.getId()));
                }
        );

        return detail;
    }
}
