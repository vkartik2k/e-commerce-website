Prerequisites : Nodejs must be installed to run the server. Mysql should be installed and running while node file is running.
Login in mysql is done through root and password is assumed to be '' (blank). If you want to change this, you can change this from server/database/index.js.

To start the server, the following commands should be typed on the cmd.

cd <location of file server.js>/e-commerce-website/server
node server.js

Admin feature is provided on http://localhost:1212/private which is only accessable to user with phone number 9999999999 (which is unique).
To get admin rights signup with 9999999999 and goto http://localhost:1212/private/

Adding image option is not directly provided so to give product images make changes in public/image and public/forhbs/image folder and set image as "pid".png eg. 101.png and 101a.png, 101b.png and 101c.png. 

The site run on http://localhost:1212/.


