package org.rssb.mda.entity;


import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by rs on 20/6/15.
 */
@Entity
@NamedQueries({
@NamedQuery(name = "Entry.findPendingSignOut", query = "SELECT e FROM Entry e WHERE e.detailsId = ?1 AND e.signOut IS NULL AND e.signIn IS NOT NULL" ),
@NamedQuery(name = "Entry.findPendingSignOutByToken", query = "SELECT e FROM Entry e WHERE e.tokenId = ?1 AND e.signOut IS NULL AND e.signIn IS NOT NULL" )
})
@Table(name = "Entry")
@Access(value = AccessType.FIELD)
public class Entry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long uId;
    @Column(name = "details_id")
    private long detailsId;

    @Column(name = "token_id")
    private long tokenId;

    @Column(name="sign_in")
    private Date signIn ;

    @Column(name="sign_out")
    private Date signOut;

    public int getCounterId() {
        return counterId;
    }

    public void setCounterId(int counterId) {
        this.counterId = counterId;
    }

    @Column(name = "counter_id")
    private int counterId;

    @Column(name="count")
    private int count;

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public long getuId()
    {
        return uId;
    }

    public void setuId(int id)
    {
        this.uId=uId;
    }

    public long getDetailsId()
    {
        return detailsId;
    }

    public void setDetailsId(int detailsId)
    {
        this.detailsId=detailsId;
    }

    public long getTokenId()
    {
        return tokenId;
    }

    public void setTokenId(int tokenId)
    {
        this.tokenId=tokenId;
    }

    public Date getSignIn() {
        return signIn;
    }

    public void setSignIn(Date signIn) {
        this.signIn = signIn;
    }

    public Date getSignOut() {
        return signOut;
    }

    public void setSignOut(Date signOut) {
        this.signOut = signOut;
    }
}
