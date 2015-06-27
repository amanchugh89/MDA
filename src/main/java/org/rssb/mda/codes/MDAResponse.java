package org.rssb.mda.codes;

/**
 * Created by esuchug on 27-06-2015.
 */
public enum  MDAResponse {
    
    OK("OK"),
    NO_RESPONSE("No Response Received");
    private final String desc;

    MDAResponse(String desc){
        this.desc = desc;
    }

    public String getDesc() {
        return desc;
    }
}
