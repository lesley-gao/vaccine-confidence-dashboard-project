package org.uoa.vaccinesafetyconfidence.config;


import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @Author
 * @createTime
 * @Version
 * @注释：
 */
@Configuration
public class Swagger3Config {

    @Bean
    public GroupedOpenApi createRestApi() {
        return GroupedOpenApi.builder()
                .group("vaccinesafetyconfidence")
                .pathsToMatch("/**")
                .build();
    }

//    // 此处为模块化配置，将API文档配置成几个模块，添加每个模块名，此次模块下所有API接口的统一前缀
//    // 第一个模块
//    @Bean
//    public GroupedOpenApi PayApi()
//    {
//        return GroupedOpenApi.builder().group("教师文档API").pathsToMatch("/admin/edu/**").build();
//    }
//
//
//
//    // 第二个模块
//    @Bean
//    public GroupedOpenApi OssFileApi()
//    {
//        return GroupedOpenApi.builder().group("文件上传API").pathsToMatch("/admin/file/**").build();
//    }


    @Bean
    public OpenAPI springShopOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("Vaccine Confidence API")
                        .description("Front- and Back-end Interface Documentation")
                        .version("v1.0.0")
                        .license(new License().name("Apache 2.0").url("http://springdoc.org")))
                .externalDocs(new ExternalDocumentation()
                        .description("SpringShop Wiki Documentation")
                        .url("https://springshop.wiki.github.org/docs"));
    }


}