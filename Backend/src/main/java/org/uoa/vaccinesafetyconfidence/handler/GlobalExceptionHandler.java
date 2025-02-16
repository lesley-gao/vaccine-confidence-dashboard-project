package org.uoa.vaccinesafetyconfidence.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.uoa.vaccinesafetyconfidence.exception.BusinessException;
import org.uoa.vaccinesafetyconfidence.result.R;





@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    // 处理业务异常
    @ExceptionHandler(value = BusinessException.class)
    public R BusinessExceptionHandler(/* HttpServletRequest request, */ BusinessException e){
        log.error("Server exception: {}", e.getMessage());
        return R.error().code(e.getCode()).message(e.getMessage());
    }

}
