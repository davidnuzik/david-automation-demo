package com.mycompany.app;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.*;
import org.junit.Test;
import static org.junit.Assert.*;

public class SimpleTest {
    @Test
    public void testSimpleGitHubNav() throws InterruptedException {
        System.setProperty("webdriver.chrome.driver", "./drivers/chromedriver"); 
        WebDriver driver = new ChromeDriver();
          // Launch /davidnuzik
          driver.get("https://github.com/davidnuzik");
          // Wait to ensure all elements rendered - this is generally not a good practice but is used here for simplicity
          Thread.sleep(2000);
          // Click on the first pinned repo hyperlink
          driver.findElement(By.cssSelector(".repo:nth-child(1)")).click();
          // Verify title contains expected string
          assertTrue(driver.getTitle().contains("davidnuzik"));

    }
}
