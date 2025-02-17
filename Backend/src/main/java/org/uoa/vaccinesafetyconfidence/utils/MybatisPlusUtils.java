package org.uoa.vaccinesafetyconfidence.utils;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.toolkit.support.SFunction;
import org.uoa.vaccinesafetyconfidence.exception.BusinessException;
import org.uoa.vaccinesafetyconfidence.result.ResponseEnum;

public class MybatisPlusUtils {
    /**
     * 检查新值是否已存在，若存在则抛出指定异常
     *
     * @param <T>       实体类类型
     * @param oldValue  当前值
     * @param newValue  新值
     * @param getter    查询条件字段的 Lambda 表达式
     * @param errorEnum 异常枚举
     * @param mapper    数据访问层 Mapper
     * @throws BusinessException 如果新值已存在，则抛出异常
     */
    private <T> void checkDuplicate(
            String oldValue,
            String newValue,
            SFunction<T, String> getter,
            ResponseEnum errorEnum,
            BaseMapper<T> mapper
    ) {
        if (!newValue.equals(oldValue)) {
            LambdaQueryWrapper<T> queryWrapper = new LambdaQueryWrapper<>();
            queryWrapper.eq(getter, newValue);
            if (mapper.selectOne(queryWrapper) != null) {
                throw new BusinessException(errorEnum);
            }
        }
    }
}
