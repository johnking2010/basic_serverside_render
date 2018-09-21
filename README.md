# basic_serverside_render
serving static .JPG assets dynamically from Node

### demo: https://secret-hollows-16654.herokuapp.com/ 

- Example of loading static assets (images) from Node, to display in an HTML document.
- Inline CSS/JS script (using jQuery) handles simple styling and receipt of filepaths from Node to dynamically generate HTML.
- uses 'hover' action to temporarily enlarge images when cursor rolls over them
- [Node app uses: path, fs, express, serve-index, and filehound] 
---
- To run:
  - clone/DL repo
  - create '/images' directory within '/public'
  - add (.JPG) images to this newly created folder
  - npm install
  - npm start
  - navigate to http://localhost:3001 
  - [FTP access via: .../images]
  - [Text List of served files .../list]
 ---