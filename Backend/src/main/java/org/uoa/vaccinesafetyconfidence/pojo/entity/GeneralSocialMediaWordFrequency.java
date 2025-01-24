package org.uoa.vaccinesafetyconfidence.pojo.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.sql.Timestamp;

@Data
@TableName("`GENERAL_SOCIAL_MEDIA_WORD_FREQUENCY_T`")
public class GeneralSocialMediaWordFrequency {

    private Integer gsmwfIdPk;

    private String gsmwfPlatform;

    private Timestamp gsmwfTimeCreated;

    private String gsmwfWord;

    private GSMWFSentiment gsmwfSentiment;

    public enum GSMWFSentiment{
        positive, neutral, negative
    }

    private float gsmwfFrequency;

}
