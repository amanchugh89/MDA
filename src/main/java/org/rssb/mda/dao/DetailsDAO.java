package org.rssb.mda.dao;

import org.rssb.mda.entity.Details;

/**
 * Created by rs on 26/6/15.
 */
public class DetailsDAO {

    public void addDetails(Details details)
    {
       /* Transaction tnx = null;
        Session session = HibernateUtil.getSessionFactory().openSession();
        try {
            tnx = session.beginTransaction();
            session.save(details);
        } catch (RuntimeException e) {
            if (tnx != null) {
                tnx.rollback();
            }
            e.printStackTrace();
        } finally {
            session.flush();
            session.close();
        }*/
    }

    public void updateDetails(Details details)
    {
      /*  Transaction tnx = null;
        Session session = HibernateUtil.getSessionFactory().openSession();
        try {
            tnx = session.beginTransaction();
            session.update(details);
        } catch (RuntimeException e) {
            if (tnx != null) {
                tnx.rollback();
            }
            e.printStackTrace();
        } finally {
            session.flush();
            session.close();
        }*/
    }

}
