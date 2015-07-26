package org.rssb.mda.exceptions;

/**
 * Created by esuchug on 27-06-2015.
 */
public enum MDAResponse {

    OK("OK"),
    NO_RESPONSE("No Response Received"), PHONE_VALIDATION_ERROR("Error validating phone no."), NAME_VALIDATION_ERROR("Error validating Name"), GENDER_VALIDATION_ERROR("Error validating Gender"), ADDRESS_VALIDATION_ERROR("Error validating Address"), PENDING_SIGN_OUT("Pending Sign out"), DETAILS_NOT_FOUND("Details not found for mentioned Id"), NO_PENDING_SIGN_OUT("No pending sign out"), TOKEN_NOT_VALID("Token not valid");
    private final String desc;

    MDAResponse(String desc) {
        this.desc = desc;
    }

    public String getDesc() {
        return desc;
    }
}
