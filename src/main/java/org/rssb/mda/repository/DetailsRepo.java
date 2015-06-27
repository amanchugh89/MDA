package org.rssb.mda.repository;

import org.rssb.mda.entity.Details;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by esuchug on 27-06-2015.
 */
public interface DetailsRepo extends CrudRepository<Details, Long> {


    Details findByMobile(Long mobile);

    Details findByName(String name);

}
