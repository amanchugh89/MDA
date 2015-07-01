package org.rssb.mda.rest.helper;

import org.rssb.mda.entity.Details;
import org.rssb.mda.rest.types.MobileDetails;

/**
 * Created by esuchug on 30-06-2015.
 */

public interface DepositService {

    MobileDetails submitDetails(Details mobileDetails);

    MobileDetails getDetailsByNo(Long mobile);

    MobileDetails getDetailsById(Long Id);

    MobileDetails getDetailsByAltNo(Long altNo);

    MobileDetails getDetailsByName(String name);

    MobileDetails updateDetail(MobileDetails detail);


}
