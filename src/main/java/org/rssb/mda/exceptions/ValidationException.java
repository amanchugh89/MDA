package org.rssb.mda.exceptions;

/**
 * Created by esuchug on 30-06-2015.
 */
public class ValidationException extends Exception {

    public MDAResponse getResponse() {
        return response;
    }

    public void setResponse(MDAResponse response) {
        this.response = response;
    }

    MDAResponse response;

    public ValidationException(MDAResponse response){
        super(response.getDesc());
        this.response = response;


    }


}
