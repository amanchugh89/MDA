package org.rssb.mda.repository;

import org.rssb.mda.entity.Entry;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by esuchug on 27-06-2015.
 */
public interface EntryRepo extends CrudRepository<Entry, Long> {

List<Entry> findByDetailsId(long detailsId);

   Entry findPendingSignOut(long detailsId);

   Entry findByTokenId(long tokenId);

}
