package com.assignment.dao;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {

    private static final String URL =
            "jdbc:oracle:thin:@localhost:1521/orcl";

    private static final String USERNAME = "SAGAR";

    private static final String PASSWORD =
            System.getenv("ORACLE_DB_PASSWORD");

    public static Connection getConnection() throws Exception {


        Class.forName("oracle.jdbc.OracleDriver");

        return DriverManager.getConnection(
                URL,
                USERNAME,
                PASSWORD
        );
    }
}