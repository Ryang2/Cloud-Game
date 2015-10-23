package controller;


import java.io.*;

import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import com.google.gson.FieldNamingPolicy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import bean.Question;

import java.sql.*;
import java.util.ArrayList;



/**
 * Servlet implementation class GameController
 */
@WebServlet("/GameController")
public class GameController extends HttpServlet {
	private static final long serialVersionUID = 1L;

    
	final static String JDBC_DRIVER = "com.mysql.jdbc.Driver"; 
	final static String DB_URL = "jdbc:mysql://us-cdbr-azure-west-c.cloudapp.net/acsm_c8854637e9312f5";
	final static String USER = "b3a63fd5707ad7";
	final static String PASS = "84fdf080";
	boolean flag= true;
	
	PreparedStatement stmt = null;
	
    public GameController() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		// Set the response message's MIME type
	     response.setContentType("text/html; charset=UTF-8");
	     
	     // Allocate a output writer to write the response message into the network socket
	     PrintWriter out = response.getWriter();
	     String check = request.getParameter("check");
	     System.out.println(check);
     	
	     Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().setFieldNamingPolicy(FieldNamingPolicy.UPPER_CAMEL_CASE).create();
     	
	     /* call login stored procedure*/
	     
	     String username = request.getParameter("LANID");
	     String password = request.getParameter("pwd");
	      if (check.equals("login")) {

			out.write(gson.toJson(aunthenticateLogin(username, password)));
		}
	      
	     
	     response.setContentType("application/json");
	     response.setCharacterEncoding("UTF-8");
		 JsonArray array = new JsonArray();


		
	}
	
	
	/***************** Authenticate login function ***********************/
	
	private static JsonArray aunthenticateLogin(String username, String password) {
		Connection conn = null;
		CallableStatement cStmt = null;
		JsonArray array = new JsonArray();
		ResultSet rs1;

		try {
			Class.forName(JDBC_DRIVER);
			System.out.println("Connecting to database...");
			conn = DriverManager.getConnection(DB_URL, USER, PASS);
			Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls()
					.setFieldNamingPolicy(FieldNamingPolicy.UPPER_CAMEL_CASE).create();
			System.out.println("stored proc" + username);
			
			cStmt = conn.prepareCall("{CALL spLogin(?,?)}");
			System.out.println(cStmt);
			cStmt.setString(1, username);
			cStmt.setString(2, password);

			cStmt.execute();
			rs1 = cStmt.getResultSet();
			
			while (rs1.next()) {
				JsonObject elem = new JsonObject();
				elem.addProperty("gameID",rs1.getString("GameID"));
				elem.addProperty("gameName",rs1.getString("GameName"));
				elem.addProperty("gameDesc",rs1.getString("GameDescription"));
				elem.addProperty("gameCompleted",rs1.getString("IsGameCompleted"));
				elem.addProperty("coins", rs1.getString("coins"));
				array.add(elem);
				// System.out.println(gson.toJson(elem));
			}

			rs1.close();
			cStmt.close();
			conn.close();
			return array;

		} catch (SQLException se) {
			se.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (cStmt != null)
					cStmt.close();
			} catch (SQLException se2) {
			}
			try {
				if (conn != null) {
					conn.close();
				}
			} catch (SQLException se) {
				se.printStackTrace();
			}
		}
		return null;
	}
	
	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
