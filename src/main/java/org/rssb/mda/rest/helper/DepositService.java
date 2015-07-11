package org.rssb.mda.rest.helper;

import org.rssb.mda.entity.Details;
import org.rssb.mda.exceptions.ValidationException;

import java.util.List;

/**
 * Created by esuchug on 30-06-2015.
 */

public interface DepositService {

    Details submitDetails(Details mobileDetails) throws ValidationException;

    Details getDetailsByNo(Long mobile);

    Details getDetailsById(Long Id);

    List<Details> getDetailsByAltNo(Long altNo);

    List<Details> getDetailsByName(String name);

    Details updateDetail(Details detail);


}
