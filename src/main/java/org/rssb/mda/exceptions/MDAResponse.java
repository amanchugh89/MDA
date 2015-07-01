package org.rssb.mda.exceptions;

/**
 * Created by esuchug on 27-06-2015.
 */
public enum  MDAResponse {
    
    OK("OK"),
    NO_RESPONSE("No Response Received"), PHONE_VALIDATION_ERROR("Error validating phone no."), NAME_VALIDATION_ERROR("Error validating Name"), GENDER_VALIDATION_ERROR("Error validating Gender"), ADDRESS_VALIDATION_ERROR("Error validating Address");
    private final String desc;

    MDAResponse(String desc){
        this.desc = desc;
    }

    public String getDesc() {
        return desc;
    }
}
