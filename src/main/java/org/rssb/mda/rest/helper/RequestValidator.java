package org.rssb.mda.rest.helper;

import org.rssb.mda.entity.Details;
import org.rssb.mda.exceptions.MDAResponse;
import org.rssb.mda.exceptions.ValidationException;

/**
 * Created by esuchug on 30-06-2015.
 */
public class RequestValidator {


    public static void validateMobileRequest(Details details) throws ValidationException{

        validateMobile(details.getMobile());
        validateAddress(details.getAddress());
        validateGender(details.getGender());
        validateMobile(details.getalternateNumber());
        validateName(details.getname());
    }


    public static void validateMobile(long mobile) throws ValidationException {

  if(!String.valueOf(mobile).matches("^[09178]\\d{9}$")  )
      throw new ValidationException(MDAResponse.PHONE_VALIDATION_ERROR);
    }

   public static void validateName(String name) throws ValidationException {
        if(name == null || !name.matches("^[\\p{L} .'-]+$")  )
            throw new ValidationException(MDAResponse.NAME_VALIDATION_ERROR);

    }

   public static void validateAddress(String address) throws ValidationException {
        if(address == null)
        if(address == null   )
            throw new ValidationException(MDAResponse.ADDRESS_VALIDATION_ERROR);

    }

   public static void validateGender(String gender) throws ValidationException {
if(gender == null ||!gender.equalsIgnoreCase("M") && !gender.equalsIgnoreCase("F"))
    throw new ValidationException(MDAResponse.GENDER_VALIDATION_ERROR);
    }


}
