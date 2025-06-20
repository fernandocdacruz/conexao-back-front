package com.example.web;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/meuServlet") // Mapeamento da URL para o Servlet
public class MeuServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    // ✅ Adicionado: método para configurar os headers de CORS
    private void setAccessControlHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*"); // Permite qualquer origem (somente para desenvolvimento)
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    }

    // ✅ Responde à requisição GET
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        setAccessControlHeaders(response); // ← importante para CORS
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String mensagem = "{\"mensagem\": \"Olá do Servlet!\"}";
        response.getWriter().write(mensagem);
    }

    // ✅ Responde à requisição POST
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        setAccessControlHeaders(response); // ← importante para CORS
        String nome = request.getParameter("nome");

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String respostaPost = "{\"mensagem\": \"Olá, " + nome + ", do Servlet (POST)!\"}";
        response.getWriter().write(respostaPost);
    }

    // ✅ Também responde a requisição OPTIONS (pré-flight de CORS)
    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setAccessControlHeaders(resp);
        resp.setStatus(HttpServletResponse.SC_OK);
    }
}
