package org.uoa.vaccinesafetyconfidence.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import org.uoa.vaccinesafetyconfidence.pojo.entity.GeneralSocialMediaWordFrequency;

import java.util.List;

@Repository
public interface GeneralSocialMediaWordFrequencyMapper extends BaseMapper<GeneralSocialMediaWordFrequency> {

    @Select("SELECT * FROM `GENERAL_SOCIAL_MEDIA_WORD_FREQUENCY_T` WHERE DATE(`gsmwf_time_created`) = (SELECT DATE(MAX(`gsmwf_time_created`)) FROM `GENERAL_SOCIAL_MEDIA_WORD_FREQUENCY_T`)")
    List<GeneralSocialMediaWordFrequency> selectRecordsOfLatestDate();

}
