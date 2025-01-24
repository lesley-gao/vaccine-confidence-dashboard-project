package org.uoa.vaccinesafetyconfidence.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import org.uoa.vaccinesafetyconfidence.pojo.entity.UserSubscription;
import org.uoa.vaccinesafetyconfidence.pojo.entity.Vaccine;

import java.util.List;

@Repository
public interface UserSubscriptionMapper extends BaseMapper<UserSubscription> {

    @Select("""
    SELECT v.*
    FROM `VACCINE_T` v
    JOIN `USER_SUBSCRIPTION_T` us ON v.vac_id_pk = us.vac_id_pk
    WHERE us.user_uid_pk = #{userUid}
    """)
    List<Vaccine> getUserSubscribedVaccine(@Param("userUid") String userUid);
}
