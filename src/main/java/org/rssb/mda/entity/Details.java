package org.rssb.mda.entity;

import javax.persistence.*;

/**
 * Created by rs on 20/6/15.
 */

@Entity
@Table(name = "Details")
@Access(value = AccessType.FIELD)
public class Details {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "city")
    private String city;



    @Column(name = "pincode")
    private int pincode;

    @Column(name = "address")
    private String address;

    @Column(name = "fathers_name")
    private String fathersName;

    @Column(name = "mothers_name")
    private String mothersName;
    @Column(name = "gender")
    private String gender;
    @Column(name = "mobileNo")
    private long mobileNo;
    @Column(name = "alternate_number")
    private long alternateNumber;
    @Column(name = "center_id")
    private long centerId;
    @Column(name = "image")
    private String image;
    @Column(name = "age")
    private int age;



    public void Details() {
    }


    public void Details(String name, String address, long mobileNo, long alternateNumber,
                        String city, String mothersName, String fathersName, String gender) {
        this.name = name;
        this.address = address;
        this.mobileNo = mobileNo;
        this.alternateNumber = alternateNumber;
        this.city = city;
        this.mothersName = mothersName;
        this.fathersName = fathersName;
        this.gender = gender;
    }


    public long getId() {
        return id;
    }

    public String getname() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMothersName() {
        return mothersName;
    }

    public void setMothersName(String mothersName) {
        this.mothersName = mothersName;
    }

    public String getFathersName() {
        return fathersName;
    }

    public void setFathersName(String fathersName) {
        this.fathersName = fathersName;
    }

    public long getMobileNo() {
        return mobileNo;
    }

    public void setMobileNo(Long mobileNo) {
        this.mobileNo = mobileNo;
    }

    public long getalternateNumber() {
        return alternateNumber;
    }

    public void setAlternateNumber(Long alternateNumber) {
        this.alternateNumber = alternateNumber;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getPincode() {
        return pincode;
    }

    public void setPincode(int pincode) {
        this.pincode = pincode;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    @Override
    public String toString() {
        return "Details{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", city='" + city + '\'' +
                ", address='" + address + '\'' +
                ", fathersName='" + fathersName + '\'' +
                ", mothersName='" + mothersName + '\'' +
                ", gender='" + gender + '\'' +
                ", mobile=" + mobileNo +
                ", alternateNumber=" + alternateNumber +
                ", centerId=" + centerId +
                '}';
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
