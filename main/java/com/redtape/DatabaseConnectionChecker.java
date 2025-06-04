package com.redtape;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;

@Component 
public class DatabaseConnectionChecker implements CommandLineRunner {
	private final DataSource dataSource;

    public DatabaseConnectionChecker(DataSource dataSource) {
        this.dataSource = dataSource;
    }
	@Override
	public void run(String... args) throws Exception {
		try (Connection conn = dataSource.getConnection()) {
            System.out.println("✅ Database connected successfully: " + conn.getMetaData().getURL());
        } catch (Exception e) {
            System.err.println("❌ Failed to connect to the database: " + e.getMessage());
        }
	}

}
