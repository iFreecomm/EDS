import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ActionServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    public void service(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
    	String uri = request.getRequestURI();
    	String url = uri.substring(0, uri.lastIndexOf("do"))+"json";
    	
    	response.sendRedirect(url);
    }
}



