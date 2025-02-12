# Dog Fetcher  
  
This site will allow users to view different dogs and filter by dog breed. You can also sort them either ascending or descending by dog breed alphabetically when you search.
Once you have searched for dogs, you may click to favorite or unfavorite dogs. This will both add them to your favorite bar and update the side bar to include pictures of your
favorite pups. Once you have enough favorites selected, feel free to select "Pick one for me" and it will select one of the dogs for you from your favorites list.  
  
You will be signed out after one hour, but don't worry! Your favorited dogs will be waiting for you when you sign back in!  
  
## Running this site  
  
To run the site online, simply go to [https://ralumbaugh.github.io/Dog-Fetcher](https://ralumbaugh.github.io/Dog-Fetcher/) and you're ready to meet your new friends!  
  
If you would rather run it locally, feel free to follow the following instructions:  
  
1. Either clone the file into a folder that you would like to run this from or download the zip folder from this repo  
  A. If you want to clone your file, first make sure that you have git installed. To check which version of git you have installed, you can use the command line tool of your choice and type either
     `git --version` or `git -v` to check the version. If you don't have Git installed, you may install it here: [https://git-scm.com/book/en/v2/Getting-Started-Installing-Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)  
       I.  Once you have confirmed you have git installed, open the command line tool of your choice and navigate into the folder you want to store this project.  
       II. Once in the folder, type "git clone https://github.com/ralumbaugh/Dog-Fetcher.git". This will create a folder called "Dog-Fetcher" which will contain everything you need to run it locally!  
  B. To download the zip file, simply click the dropdown under code and click "Download Zip". Once you have downloaded that file, unzip it into your preferred folder.  
2. Make sure that you have Node and Node Project Manager installed. To check, go into your command line tool of choice and type `node --version` or `node -v` to see your version of node and
   `npm --version` or `npm -v` for your version of Node Project Manager.  
  A. The version of Node that I used for this project was 22.13.1. The version of Node Project Manager I used was 11.1.0. If you are using a different version of node or npm, please check compatability
     with the project's dependencies.  
  B. If these commands do not work for you, you may need to install node onto your system. Feel free to check it out at [https://nodejs.org/en/download](https://nodejs.org/en/download)  
3. Once Node and Node Project Manager are installed, feel free to install the needed modules by typing `npm install`. This will install the needed dependencies and modules in order to run.  
4. You may run this in either a dev environment or a production environment. The dev environment will allow you to make changes, will automatically reload during these changes, and will allow debugging.
   The production environment will be more optimzed, but you will need to build between any changes. Pick an environment, run it, and get ready to start favoriting some dogs!  
  A. To run this in the dev environment, type `npm run dev`. Once this is running, you will see a link in your command line interface where this is loaded.  
      I.  For the dev environment, this should default to [http://localhost:5173/Dog-Fetcher/](http://localhost:5173/Dog-Fetcher/)  
  B. To run this in a production environment, type `npm run build` to build the production folder. Once this is complete, you can preview it with `npm run preview`. Once this is running, you will see a
     link in your command line interface where this is loaded.  
     II.  This should give you a link to a localhost to run it at. This should default to [http://localhost:4173/Dog-Fetcher/](http://localhost:4173/Dog-Fetcher/)  
  
Note: Even when running this locally you will need an internet connection, as it is making API calls to retrieve the dogs.  
  
Have fun finding adorable dogs!  
  
#
