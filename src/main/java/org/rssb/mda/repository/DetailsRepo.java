package org.rssb.mda.repository;

import org.rssb.mda.entity.Details;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by esuchug on 27-06-2015.
 */
public interface DetailsRepo extends CrudRepository<Details, Long> {


    Details findByMobileNo(Long mobileNo);
    List<Details> findByName(String name);

    List<Details> findByAlternateNumber(Long alternateNumber);
}
