package org.rssb.mda.rest.types;

import org.rssb.mda.entity.Details;
import org.rssb.mda.entity.Entry;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by rs on 20/6/15.
 */


public class MobileDetails {


    private Details details;
private List<Entry> entry = new ArrayList<Entry>();

    public MobileDetails(Entry e, Details d) {
        this.entry .add(e);
        this.details=d;
    }

    public MobileDetails(Details details, List<Entry> entryList) {
        this.details=details;
        this.entry=entryList;
    }

    public Details getDetails() {
        return details;
    }

    public void setDetails(Details details) {
        this.details = details;
    }

    public List<Entry> getEntry() {
        return entry;
    }

    public void setEntry(Entry entry) {
        this.entry = (List<Entry>) entry;
    }

    @Override
    public String toString() {
        return "MobileDetails{" +
                "detailsListMap=" + details +
                '}';
    }
}
