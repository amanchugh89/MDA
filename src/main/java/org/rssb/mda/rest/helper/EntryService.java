package org.rssb.mda.rest.helper;

import org.rssb.mda.entity.Entry;
import org.rssb.mda.exceptions.ValidationException;
import org.rssb.mda.rest.types.MobileDetails;

/**
 * Created by esuchug on 01-07-2015.
 */
public interface EntryService {

    Entry signIn(Entry entry) throws ValidationException;

    Entry signOut(Entry entry) throws ValidationException;

    MobileDetails history(Long entryId) throws ValidationException;


    Entry getEntryByToken(Long tokenId);
}
