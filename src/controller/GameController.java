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
	boolean flag = true;

	PreparedStatement stmt = null;

	public GameController() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		// Set the response message's MIME type
		// response.setContentType("text/html; charset=UTF-8");
		
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		JsonArray array = new JsonArray();

		// Allocate a output writer to write the response message into the
		// network socket
		
		PrintWriter out = response.getWriter();
		
		Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls()
				.setFieldNamingPolicy(FieldNamingPolicy.UPPER_CAMEL_CASE).create();
		
		String fn = "1"; 	//request.getParameter("fn");
		
		/********* call login stored procedure **********/
				
		JsonArray array1 = new JsonArray();
		String username = "user1;";		//request.getParameter("LANID");
		String password = "password"; 	//request.getParameter("pwd");
		
		if(fn.equals("1")){
		//array1 = aunthenticateLogin(username, password);
			out.write(gson.toJson(aunthenticateLogin(username, password)));
		}

		/*************** call new game stored procedure ***************/
				
		String gameName = "dummyGame1new1";
		String qaArray = "Availability";
		String gameDesc = "dummyGame1NewDesc1";

		// String gameName = request.getParameter("gameName");
		// String gameDesc = request.getParameter("gameDesc");
		// String qaArray = request.getParameter("QAArray";)
		
		if(fn.equals("2")){
			out.write(gson.toJson(newGame(username, gameName, gameDesc, qaArray)));
		}

		/************* save game instance ***********************/

		String lanId = "1001";
		String modelId = "1";
		String completed = "0";
		String betCoins = "100";
		String netCoins = "1";
		String[] clouds = {"1","2"};
		String[] questions = {"I want cake","this is bad"};
		
		if(fn.equals("3")){
			out.write(gson.toJson(saveGame(username, lanId, modelId, gameName, gameDesc, completed, betCoins, netCoins,
											clouds, questions)));
		}
		/**************** load saved game stored procedure *************/

		String gameId = "1101";
		
		if(fn.equals("4")){
			out.write(gson.toJson(loadGame(username, gameId)));
		}
	
	} // end of doGet

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
				elem.addProperty("gameID", rs1.getString("GameID"));
				elem.addProperty("gameName", rs1.getString("GameName"));
				elem.addProperty("gameDesc", rs1.getString("GameDescription"));
				elem.addProperty("gameCompleted", rs1.getString("IsGameCompleted"));
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

	/*************** new game function ****************/

	private static JsonArray newGame(String username, String gameName, String gameDesc, String qaArray) {
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

			cStmt = conn.prepareCall("{CALL spNewGame(?,?,?,?)}");
			System.out.println(cStmt);
			cStmt.setString(1, username);
			cStmt.setString(2, gameName);
			cStmt.setString(3, gameDesc);
			cStmt.setString(4, qaArray);

			cStmt.execute();
			rs1 = cStmt.getResultSet();

			while (rs1.next()) {
				JsonObject elem = new JsonObject();
				elem.addProperty("qaName", rs1.getString("QualityAttributeName"));
				elem.addProperty("qsId", rs1.getString("QuestionID"));
				elem.addProperty("qsValue", rs1.getString("QuestionValue"));
				elem.addProperty("answerId", rs1.getString("AnswerID"));
				elem.addProperty("answerValue", rs1.getString("AnswerValue"));
				elem.addProperty("modelId", rs1.getString("ModelID"));
				elem.addProperty("modelAnsValue", rs1.getString("ModelAnswerValue"));
				elem.addProperty("tipId", rs1.getString("TipId"));
				elem.addProperty("tipName", rs1.getString("TipName"));
				elem.addProperty("tipDescription", rs1.getString("TipDescription"));
				elem.addProperty("tipQA", rs1.getString("TipQA"));
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

	/**************** save game ****************/

	private static JsonArray saveGame(String username, String lanId, String modelId, String gameName, String gameDesc,
			String completed, String betCoins, String netCoins, String[] clouds, String[] questions) {
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

			cStmt = conn.prepareCall("{CALL spSaveGame(?,?,?,?,?,?,?,?)}");
			System.out.println(cStmt);
			cStmt.setString(1, username);
			cStmt.setInt(2, Integer.parseInt(modelId));
			cStmt.setInt(3, Integer.parseInt(completed));
			cStmt.setInt(4, Integer.parseInt(betCoins));
			cStmt.setInt(5, Integer.parseInt(netCoins));
			cStmt.setObject(6, clouds);
			cStmt.setObject(7, questions);

			cStmt.execute();
			rs1 = cStmt.getResultSet();

			while (rs1.next()) {
				JsonObject elem = new JsonObject();
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

	/************** load saved game ***********/

	private static JsonArray loadGame(String username, String gameid) {
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

			cStmt = conn.prepareCall("{CALL spLoadGame(?,?)}");
			System.out.println(cStmt);
			cStmt.setString(1, username);
			cStmt.setInt(2, Integer.parseInt(gameid));

			cStmt.execute();
			rs1 = cStmt.getResultSet();

			while (rs1.next()) {
				JsonObject elem = new JsonObject();
				elem.addProperty("gameID", rs1.getString("GameID"));
				elem.addProperty("gameName", rs1.getString("GameName"));
				elem.addProperty("modelId", rs1.getString("CloudModelID"));
				elem.addProperty("modelBetCoins", rs1.getString("ModelBettingCoins"));
				elem.addProperty("netCoins", rs1.getString("netcoins"));
				elem.addProperty("modelId", rs1.getString("ModelId"));
				elem.addProperty("qualityAttributeId", rs1.getString("QualityAttributeID"));
				elem.addProperty("cloudScore", rs1.getString("cloudScore"));
				elem.addProperty("questionId", rs1.getString("QuestionID"));
				elem.addProperty("theAnswer", rs1.getString("theAnswer"));
				elem.addProperty("userNotes", rs1.getString("UserNotes"));
				elem.addProperty("questionAsked", rs1.getString("QuestionAsked"));
				elem.addProperty("questionValue", rs1.getString("QuestionValue"));
				elem.addProperty("answerId", rs1.getString("AnswerID"));
				elem.addProperty("answerValue", rs1.getString("AnswerValue"));
				elem.addProperty("modelId", rs1.getString("ModelID"));
				elem.addProperty("modelAnswerValue", rs1.getString("ModelAnswerValue"));
				elem.addProperty("qualityAttributeName", rs1.getString("QualityAttributeName"));
				elem.addProperty("tipId", rs1.getString("TipID"));
				elem.addProperty("tipName", rs1.getString("TipName"));
				elem.addProperty("tipDescription", rs1.getString("TipDescription"));
				elem.addProperty("tipQA", rs1.getString("TipQA"));
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
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
