To correctly display the 3D Web application stored in this directory,
you will need a Web server that provides access to it. You can then
use a standard, WebGL-capable browser to view the Web application.

Examples for Web servers are:
* Apache
* XAMPP (Windows)
* IIS (Windows)
* nginx
* ...

If you have an IDE for Web development, such as WebStorm, you might
already have an integrated Web server there. With WebStorm, for example,
you can simply open this directory inside the IDE, then select the
index.html file for editing and press one of the browser buttons to open
the 3D Web application directly inside the browser, using WebStorm's
builtin server.

Easiest is usually to use XAMPP, if you are on Windows, or even Python.
Although Python's server module is usually slow, especially when
delivering images, it is most likely the server that is easiest to use.
The following section explains how to set up a small Python server.


=====================================
Example: Using Python to run a Server
=====================================

A very quick and convenient method to test your Web applications with a
simple server is to use python's HTTP server module.
This just requires that you have a python interpreter installed. You can
download one from http://python.org. You can do a lot of useful things
with python, and it also comes with a module that offers basic HTTP
server functionality. To use it, open a command line window (no matter
which operating system you are using) and navigate to the folder where
your Web application is located. If you are using a Python 2.X version,
you can then launch the SimpleHTTP server module as a standalone
application from the command line:

    python -m SimpleHTTPServer
            
If you are running a Python 3.x version, the command looks like this:

    python3 -m http.server
            
By default, the server is using port 8000. If you want to change this
behavior, you can specify another port number by simply appending it to
the command.
For Python 2.x, using port 8023 will, for example, look like this:

    python -m SimpleHTTPServer 8023
            
You can then reach the server by opening your browser and navigating to
"localhost" and by using the port you specified, for example:

    http://localhost:8023
            
If you have placed an index.html file inside the directory from which
you started the python server, this file should now be displayed inside
your browser. Otherwise, you will see a listing of the files in the
directory, and you can browse through the files to launch your website.
