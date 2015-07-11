package org.rssb.mda.entity;


import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

/**
 * Created by rs on 20/6/15.
 */
@Entity
@NamedQuery(name = "Entry.findPendingSignOut", query = "SELECT e FROM Entry e WHERE e.detailsId = ?1 AND e.signOut IS NULL AND e.signIn IS NOT NULL" )
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
    private LocalDateTime signIn ;

    @Column(name="sign_out")
    private LocalDateTime signOut;

    @Column(name = "counter_id")
    private int counterId;

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

    public LocalDateTime getSignIn() {
        return signIn;
    }

    public void setSignIn(LocalDateTime signIn) {
        this.signIn = signIn;
    }

    public LocalDateTime getSignOut() {
        return signOut;
    }

    public void setSignOut(LocalDateTime signOut) {
        this.signOut = signOut;
    }
}
