package org.rssb.mda.dao;

import org.rssb.mda.entity.Entry;

/**
 * Created by rs on 26/6/15.
 */
public class EntryDao {
    public void  insertEntry(Entry entry)
    {
      /*  Transaction tnx = null;
        Session session = HibernateUtil.getSessionFactory().openSession();
        try {
            tnx = session.beginTransaction();
            session.save(entry);
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

    public void  updateEntry(Entry entry)
    {
     /*   Transaction tnx = null;
        Session session = HibernateUtil.getSessionFactory().openSession();
        try {
            tnx = session.beginTransaction();
            session.update(entry);
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

    public void  deleteEntry(Entry entry)
    {
       /* Transaction tnx = null;
        Session session = HibernateUtil.getSessionFactory().openSession();
        try {
            tnx = session.beginTransaction();
            session.delete(entry);
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
