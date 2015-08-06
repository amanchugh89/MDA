package org.rssb.mda.rest.helper;

import org.rssb.mda.entity.Details;
import org.rssb.mda.exceptions.MDAResponse;
import org.rssb.mda.exceptions.ValidationException;
import org.rssb.mda.repository.DetailsRepo;
import org.rssb.mda.repository.EntryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;



/**
 * Created by esuchug on 30-06-2015.
 */
@Service
public class DepositServiceImpl implements DepositService {

    @Autowired
    private DetailsRepo detailsRepo;

    @Autowired
    private EntryRepo entryRepo;

    @Value("${mypath}")
    private String uploadDir ;

    @Override
    public Details submitDetails(Details mobileDetails) throws ValidationException {
        if (uploadDir != null) {
            File fileSaveDir = new File(uploadDir);
            if (!fileSaveDir.exists()) {
                fileSaveDir.mkdirs();
            }
            String   fileName = fileSaveDir.getAbsoluteFile()+ File.separator + getFileName(mobileDetails);
            try {
                FileWriter fw = new FileWriter(fileName);
                BufferedWriter bw = new BufferedWriter(fw);
                bw.write(mobileDetails.getImage());
                bw.close();
                mobileDetails.setImage(fileName);
                detailsRepo.save(mobileDetails);
            } catch (IOException e) {
                e.printStackTrace();
                throw new ValidationException(MDAResponse.ERROR_SAVING_IMAGE);

            }
            catch(DataIntegrityViolationException e){
                e.printStackTrace();
                throw new ValidationException(MDAResponse.INTEGRITY_VIOLATION_DUP_KEY);
            }
            catch (Exception e){
                e.printStackTrace();
            }

        }
        else
        throw new ValidationException(MDAResponse.NO_RESPONSE);
        return mobileDetails;
    }

    @Override
    public Details getDetailsByNo(Long mobile) {
        Details details = detailsRepo.findByMobileNo(mobile);
        return details;
    }

    @Override
    public Details getDetailsById(Long Id) {
        Details details = detailsRepo.findOne(Id);
        return details;
    }

    @Override
    public List<Details> getDetailsByAltNo(Long altNo) {
        List<Details> detailsList =detailsRepo.findByAlternateNumber(altNo);
        return detailsList;
    }

    @Override
    public List<Details> getDetailsByName(String name) {
        List<Details> detailsList =detailsRepo.findByName(name);
        return detailsList;
    }

    @Override
    public Details updateDetail(Details detail) {
    Details d =detailsRepo.findOne(detail.getId());
        d.setAddress(detail.getAddress());
        d.setAlternateNumber(detail.getalternateNumber());
        d.setFathersName(detail.getFathersName());
        d.setGender(detail.getGender());
        d.setImage(detail.getImage());
        d.setMobileNo(detail.getMobileNo());
        d.setMothersName(detail.getMothersName());
        d.setName(detail.getname());
        detailsRepo.save(d);

        return detail;
    }

    /**
     * Utility method to get file name from HTTP header content-disposition
     */
    private String getFileName(Details details) {

        return details.getMobileNo()+"_"+details.getname().substring(0,4);
    }
}
