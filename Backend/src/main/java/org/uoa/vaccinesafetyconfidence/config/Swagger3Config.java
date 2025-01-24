package org.uoa.vaccinesafetyconfidence.config;


import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


import java.util.ArrayList;
import java.util.List;

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
                .build()


                ;
    }


//    private List<RequestParameter> setHeaderToken() {
//        RequestParameterBuilder
//        ParameterBuilder tokenPar = new ParameterBuilder();
//        List<Parameter> pars = new ArrayList<>();
//        tokenPar.name("token").modelRef(new ModelRef("string")).parameterType("header").required(false).build();
//        pars.add(tokenPar.build());
//        return pars;
//    }

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


    private Components components(){
        return new Components()
                // 第一个参数是key值，后面是初始化一个安全策略的参数
                .addSecuritySchemes("token", new SecurityScheme().type(SecurityScheme.Type.APIKEY).in(SecurityScheme.In.HEADER).name("token"));
    }

    @Bean
    public OpenAPI springShopOpenAPI() {
        return new OpenAPI()
                .components(components())
                // 2. 再在这里添加上Swagger要使用的安全策略
                // addList()中写上对应的key
//                .addSecurityItem(new SecurityRequirement().addList("token"))
                .info(new Info().title("Vaccine Confidence API")
                        .description("Front- and Back-end Interface Documentation")
                        .version("v1.0.0")
                        .license(new License().name("Apache 2.0").url("http://springdoc.org")))
                .externalDocs(new ExternalDocumentation()
                        .description("SpringShop Wiki Documentation")
                        .url("https://springshop.wiki.github.org/docs"));
    }


}