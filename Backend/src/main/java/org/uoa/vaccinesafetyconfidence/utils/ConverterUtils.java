package org.uoa.vaccinesafetyconfidence.utils;

import org.springframework.beans.BeanUtils;

import java.util.ArrayList;
import java.util.List;

public class ConverterUtils {

    /**
     * 将源对象列表转换为目标对象列表
     *
     * @param sourceList 源对象列表
     * @param targetClass 目标对象的类
     * @param <S> 源对象类型
     * @param <T> 目标对象类型
     * @return 目标对象列表
     */
    public static <S, T> List<T> convertList(List<S> sourceList, Class<T> targetClass) {
        List<T> targetList = new ArrayList<>(sourceList.size());
        for (S source : sourceList) {
            try {
                // 使用反射创建目标对象
                T target = targetClass.getDeclaredConstructor().newInstance();
                // 拷贝属性
                BeanUtils.copyProperties(source, target);
                targetList.add(target);
            } catch (Exception e) {
                throw new RuntimeException("对象转换失败: " + e.getMessage(), e);
            }
        }
        return targetList;
    }

}
