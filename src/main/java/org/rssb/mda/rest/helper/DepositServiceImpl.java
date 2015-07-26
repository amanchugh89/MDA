package org.rssb.mda.rest.helper;

import org.rssb.mda.entity.Details;
import org.rssb.mda.exceptions.MDAResponse;
import org.rssb.mda.exceptions.ValidationException;
import org.rssb.mda.repository.DetailsRepo;
import org.rssb.mda.repository.EntryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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


    private void printTime(String sten){
        System.out.println(System.currentTimeMillis()+ "-----Time for "+ sten);
    }

    @Override
    public Details submitDetails(Details mobileDetails) throws ValidationException {
       // String uploadFilePath = System.getProperty("uploadDir");
        if (uploadDir != null) {
            File fileSaveDir = new File(uploadDir);
            if (!fileSaveDir.exists()) {
                fileSaveDir.mkdirs();
            }
            System.out.println("Upload File Directory=" + fileSaveDir.getAbsolutePath());
            String   fileName = fileSaveDir.getAbsoluteFile()+ File.separator + getFileName(mobileDetails);
            try {
                printTime("imaage write");
                FileWriter fw = new FileWriter(fileName);
                BufferedWriter bw = new BufferedWriter(fw);
                bw.write(mobileDetails.getImage());
                bw.close();
printTime("image write end");
            } catch (IOException e) {
                e.printStackTrace();
            }
printTime("db store");
            mobileDetails.setImage(fileName);
            detailsRepo.save(mobileDetails);
            printTime("Db store ebnd");
        }
        else
        throw new ValidationException(MDAResponse.NO_RESPONSE);
        return mobileDetails;
    }

    @Override
    public Details getDetailsByNo(Long mobile) {
        Details details = detailsRepo.findByMobile(mobile);
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

                 detailsRepo.save(detail);

        return detail;
    }

    /**
     * Utility method to get file name from HTTP header content-disposition
     */
    private String getFileName(Details details) {

        return details.getMobile()+"_"+details.getname().substring(0,4);
    }
}
