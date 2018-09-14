package com.example.RestDemo;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Controller
@SpringBootApplication
@RequestMapping(value = "/api")
//@CrossOrigin(allowCredentials="true")
public class RestDemoApplication {

	private static List<Product> productList = new ArrayList<Product>();
	static {
	productList.add(new Product(1, "Product1"));
	productList.add(new Product(2, "Product2"));
	productList.add(new Product(3, "Product3"));
	productList.add(new Product(4, "Product4"));
	productList.add(new Product(5, "Product5"));
	}

	@RequestMapping(method = GET, value = "/")
	@ResponseBody
	public List<Product> getAll() {
		return productList;
	}

	@RequestMapping(method = GET, value = "/{id}")
	@ResponseBody
	public Product getProduct(@PathVariable("id") int productNumber) {
		for (Product product : productList) {
			if(product.getProductNumber() == productNumber) {
				return product;
			}
		}
		throw new ProductNotFoundException(null);
	}

	@CrossOrigin("http://localhost:4200")
	@RequestMapping(method = PUT, value = "/")
	@ResponseBody
	public Product update(@RequestBody Product product) {
		System.out.println("prod="+product.getProductName());
		for (Product productLoop : productList) {
			if(productLoop.getProductNumber() == product.getProductNumber()) {
				productLoop.setProductName(product.getProductName());
				return productLoop;
			}
		}
		return product;
	}


	@CrossOrigin("http://localhost:4200")
	@RequestMapping(method = POST, value = "/")
	@ResponseBody
	public Product submit(@RequestBody Product product) {
		System.out.println("prod="+product.getProductName());
		productList.add(product);
		return product;
	}

	@CrossOrigin("http://localhost:4200")
	@RequestMapping(method = DELETE, value = "/{id}")
	@ResponseBody
	public boolean deleteProduct(@PathVariable("id") int productNumber) {
		for (Product product : productList) {
			if(product.getProductNumber() == productNumber) {
				return productList.remove(product);
			}
		}
		throw new ProductNotFoundException(null);
	}

	public static void main(String[] args) {
		SpringApplication.run(RestDemoApplication.class, args);
	}
}

@Configuration
@EnableWebMvc
class WebConfig implements WebMvcConfigurer {
 
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**");
    }
}

class Product {
	private int productNumber;
	private String productName;

	public Product() {
	}

	public Product(int productNumber, String productName) {
		this.productNumber = productNumber;
		this.productName = productName;
	}

	public int getProductNumber() {
		return productNumber;
	}

	public void setProductNumber(int productNumber) {
		this.productNumber = productNumber;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

}

@ResponseStatus(HttpStatus.NOT_FOUND)
class ProductNotFoundException extends RuntimeException {

	  public ProductNotFoundException(String exception) {
	    super(exception);
	  }

	}
