package org.rssb.mda.rest.helper;

import org.rssb.mda.entity.Details;
import org.rssb.mda.entity.Entry;
import org.rssb.mda.exceptions.MDAResponse;
import org.rssb.mda.exceptions.ValidationException;
import org.rssb.mda.repository.DetailsRepo;
import org.rssb.mda.repository.EntryRepo;
import org.rssb.mda.rest.types.MobileDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by esuchug on 08-07-2015.
 */
@Service
public class EntryServiceImpl implements EntryService {

    @Autowired
    private EntryRepo entryRepo;

    @Autowired
    private DetailsRepo detailsRepo;

    @Override
    public Entry signIn(Entry entry) throws ValidationException {
        Entry pendingSignOut = entryRepo.findPendingSignOut(entry.getDetailsId());
        if (pendingSignOut != null) {
            throw new ValidationException(MDAResponse.PENDING_SIGN_OUT);
        }
        if(detailsRepo.findOne(entry.getDetailsId()) == null){
            throw new ValidationException(MDAResponse.DETAILS_NOT_FOUND);
        }
        entry.setSignIn(LocalDateTime.now());
        entry = entryRepo.save(entry);
        return entry;
    }

    @Override
    public Entry signOut(Entry entry) throws ValidationException {
        Entry pendingSignOut = entryRepo.findPendingSignOut(entry.getDetailsId());
        if (pendingSignOut == null) {
            throw new ValidationException(MDAResponse.NO_PENDING_SIGN_OUT);
        }
        if(detailsRepo.findOne(entry.getDetailsId()) == null){
            throw new ValidationException(MDAResponse.DETAILS_NOT_FOUND);
        }
        entry.setSignOut(LocalDateTime.now());
        entry = entryRepo.save(entry);
        return entry;
    }

    @Override
    public MobileDetails history(Long detailsId) throws ValidationException {
        Details details = detailsRepo.findOne(detailsId);
        if(details == null){
            throw new ValidationException(MDAResponse.DETAILS_NOT_FOUND);
        }
        List<Entry> entryList = entryRepo.findByDetailsId(detailsId);
        Map<Details,List<Entry>> detailsListMap= new HashMap<>();
        detailsListMap.put(details,entryList);
        MobileDetails mobileDetails = new MobileDetails(detailsListMap);
        return mobileDetails;
    }
}
