package org.uoa.vaccinesafetyconfidence.pojo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.sql.Time;
import java.sql.Timestamp;

@Data
@TableName("`GENERAL_SOCIAL_MEDIA_SENTIMENT_SCORE_T`")
public class GeneralSocialMediaSentimentScore {

    @TableId(value = "gsmss_id_pk", type = IdType.AUTO)
    private Integer gsmssIdPk;

    private String gsmssPlatform;

    private Timestamp gsmssTimeCreated;

    private float gsmssPositive;

    private float gsmssNeutral;

    private float gsmssNegative;

}
