package org.rssb.mda.rest.types;

import org.rssb.mda.entity.Details;
import org.rssb.mda.entity.Entry;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by rs on 20/6/15.
 */


public class MobileDetails {

Map<Details,List<Entry>> detailsListMap = new HashMap<Details,List<Entry>>();

    public MobileDetails(Map<Details, List<Entry>> detailsListMap) {
        this.detailsListMap = detailsListMap;
    }

    public Map<Details, List<Entry>> getDetailsListMap() {
        return detailsListMap;
    }

    public void setDetailsListMap(Map<Details, List<Entry>> detailsListMap) {
        this.detailsListMap = detailsListMap;
    }

    @Override
    public String toString() {
        return "MobileDetails{" +
                "detailsListMap=" + detailsListMap +
                '}';
    }
}
