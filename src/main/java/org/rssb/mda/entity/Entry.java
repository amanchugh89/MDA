package org.rssb.mda.entity;


import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

/**
 * Created by rs on 20/6/15.
 */
public class Entry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int uId;
    @Column(name = "details_id")
    private long detailsId;

    @Column(name = "token_id")
    private long tokenId;

    @Column(name="sign_in")
    private Date signIn ;

    @Column(name="sign_out")
    private Date singOut;

    public int getuId()
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

}
