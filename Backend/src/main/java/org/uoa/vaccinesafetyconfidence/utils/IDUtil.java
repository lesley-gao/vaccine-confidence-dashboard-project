package org.uoa.vaccinesafetyconfidence.utils;

import java.util.UUID;

public class IDUtil {

    private IDUtil(){}

    public static long getId(){
        IdGenerate generate = new IdGenerate(0, 0);
        return generate.nextId();
    }

    public static String getUUID(){
        return UUID.randomUUID().toString().replaceAll("-","");
    }

    public static String getTenUUID(){
        return UUID.randomUUID().toString().replaceAll("-","").substring(0,10);
    }

    public static void main(String[] args)
    {
        System.out.println(getUUID());

    }
}
