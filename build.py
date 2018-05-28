import re
import os
import shutil
 
drc = {bamboo.build.working.directory}
backup = {bamboo.build.working.directory}+'/tmp'
pattern = re.compile('PYTHON')
oldstr = 'hi'
newstr = 'Python'
 
for dirpath, dirname, filename in os.walk(drc):
    #Getting a list of the full paths of files
    for fname in filename:
        path = os.path.join(dirpath, fname) #Joining dirpath and filenames
        strg = open(path).read() #Opening the files for reading only
        if re.search(pattern, strg):#If we find the pattern ....
            #print path, strg
            shutil.copy2(path, backup) #we will create a backup of it
            strg = strg.replace(oldstr, newstr) #We will create the replacement condistion
            f = open(path, 'w') #We open the files with the WRITE option
            f.write(strg) # We are writing the the changes to the files
            f.close() #Closing the files