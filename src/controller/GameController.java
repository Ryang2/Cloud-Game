package controller;


import java.io.*;
import java.sql.Connection;
import java.sql.DriverManager;

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
     	Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().setFieldNamingPolicy(FieldNamingPolicy.UPPER_CAMEL_CASE).create();
     	response.setContentType("application/json");
	    response.setCharacterEncoding("UTF-8");
		   JsonArray array = new JsonArray();


		Connection conn = null;
		   Statement stmt = null;
		   try{
			  //STEP 2: Register JDBC driver
			  Class.forName(JDBC_DRIVER);

			  //STEP 3: Open a connection
			  System.out.println("Connecting to database...");
			  conn = DriverManager.getConnection(DB_URL,USER,PASS);

			  stmt = conn.createStatement();
			  String sql;
			  //sql = "INSERT INTO hello (msg1, msg2) VALUES ('She', 'Too');";
			  //sql = "select * from question;";
			  //stmt.executeUpdate(sql);
			  
			  //STEP 4: Execute a query
			  //System.out.println("Creating statement...");
			  //stmt = conn.createStatement();
			  sql = "select * from question;";
			  ResultSet rs1 = stmt.executeQuery(sql);

			  while (rs1.next()) {
		    	  JsonObject elem = new JsonObject();
		    	  elem.addProperty("QuestionID", rs1.getString("QuestionID"));
		    	  elem.addProperty("QuestionValue", rs1.getString("QuestionValue"));
		    	  array.add(elem);
		    	  //output = output + "<tr><td>"+rs1.getString("id")+"</td><td>"+rs1.getString("name")+"</td></tr>";
		      }
			  
			  out.write(gson.toJson(array));
			  
			  //STEP 6: Clean-up environment
			  rs1.close();
			  stmt.close();
			  conn.close();
			  
		   }catch(SQLException se){
			  //Handle errors for JDBC
			  se.printStackTrace();
		   }catch(Exception e){
			  //Handle errors for Class.forName
			  e.printStackTrace();
		   }finally{
			  //finally block used to close resources
			  try{
				 if(stmt!=null)
					stmt.close();
			  }catch(SQLException se2){
			  }// nothing we can do
			  try{
				 if(conn!=null) conn.close();
			  }catch(SQLException se){
				 se.printStackTrace();
			  }//end finally try
		   }//end try
		// TODO Auto-generated method stub
		/*response.getWriter().append("Served at: ").append(request.getContextPath());
		
		 PrintWriter out = response.getWriter();
		 ArrayList<Question> questionList = new ArrayList<Question>();
		 
		 
		 try {
             Class.forName(JDBC_DRIVER);
             System.out.println("Trying to connect");
             Connection connection = DriverManager.getConnection(DB_URL,USER,PASS);
             
            out.println("Connection Established Successfull and the DATABASE NAME IS:"
                     + connection.getMetaData().getDatabaseProductName());
            System.out.println(connection.getMetaData().getDatabaseProductName());
            String sql = "SELECT QuestionName FROM question";
            stmt = connection.prepareStatement(sql);
            
            
            ResultSet rs = stmt.executeQuery(sql);
            int i = 1;
            
            while(rs.next()) {
            	out.println("loop");
            	Question question = new Question();
            	ArrayList<String> list = new ArrayList<>();
            	
            	String QuestionName = rs.getString("QuestionName");
            	out.println("Question " + i + " " +QuestionName);
            	i++;
            	question.setQuestionName(QuestionName);
            	list.add(QuestionName);
            	questionList.add(question);
            	
            	
            }
            rs.close();
            connection.close();
         } catch (Exception e) {
        	 		out.println("Unable to make connection with DB");
             e.printStackTrace();
         }
		 
		 String check = request.getParameter("check");
		 
		 if(check.equals("1") && flag==true){
			 
			 HttpSession session = request.getSession();
	         session.setAttribute("QuestionList", questionList.subList(0, 5));
	         check = "2";
	         session.setAttribute("check", check);
	         RequestDispatcher rd = request.getRequestDispatcher("/Index.jsp");
	         rd.forward(request, response);
		 }
		 //next set of questions
		 else if(check.equals("2")){
			 
			 //flag=false;
			 HttpSession session = request.getSession();
			 check = "3";
			 session.setAttribute("check", check);
	         session.setAttribute("QuestionList", questionList.subList(5, 10));
	         RequestDispatcher rd = request.getRequestDispatcher("/Index.jsp");
	         rd.forward(request, response);
		 }
		 
		 //game over; display spider chart
		 else if(check.equals("3")){
			 
			 ArrayList<String> scores = new ArrayList<>();
			 try {
	             Class.forName(JDBC_DRIVER);
	             System.out.println("Trying to connect");
	             Connection connection = DriverManager.getConnection(DB_URL,USER,PASS);
	             
	            out.println("Connection Established Successfull and the DATABASE NAME IS:"
	                     + connection.getMetaData().getDatabaseProductName());
	            System.out.println(connection.getMetaData().getDatabaseProductName());
	            
	            
	            String sql = "";	//query to get data about scores of models
	            stmt = connection.prepareStatement(sql);
	            
	            
	            ResultSet rs = stmt.executeQuery(sql);
	            
	            while(rs.next()) {
	            	//add to arraylist 'scores'
	            	
	            	
	            }
	            rs.close();
	            connection.close();
	         } catch (Exception e) {
	        	 		out.println("Unable to make connection with DB");
	             e.printStackTrace();
	         }
			 
			 HttpSession session = request.getSession();
			 session.setAttribute("Modelvalues", scores);
	         RequestDispatcher rd = request.getRequestDispatcher("/Chart.jsp");
	         rd.forward(request, response);
		 }*/
		
	}
	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
