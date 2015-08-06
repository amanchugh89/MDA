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

import java.util.Date;
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
        if(entry.getTokenId() <=0){
            throw new ValidationException(MDAResponse.TOKEN_NOT_VALID);
        }
        entry.setSignIn(new Date());
        entry = entryRepo.save(entry);
        return entry;
    }

    @Override
    public Entry signOut(long detailsId,int tokenId) throws ValidationException {
        Entry pendingSignOut = entryRepo.findPendingSignOut(detailsId);
        if (pendingSignOut == null) {
            throw new ValidationException(MDAResponse.NO_PENDING_SIGN_OUT);
        }
        if(detailsRepo.findOne(detailsId) == null){
            throw new ValidationException(MDAResponse.DETAILS_NOT_FOUND);
        }
        pendingSignOut.setSignOut(new Date());
        pendingSignOut = entryRepo.save(pendingSignOut);
        return pendingSignOut;
    }

    @Override
    public Entry getPendingEntryForUser(long detailsId) {


        return entryRepo.findPendingSignOut(detailsId);
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
        MobileDetails mobileDetails = new MobileDetails(details,entryList);
        return mobileDetails;
    }

    @Override
    public Entry getEntryByToken(Long tokenId){

       return entryRepo.findPendingSignOutByToken(tokenId);
    }
}
