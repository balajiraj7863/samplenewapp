import re
import argparse
import sys, os
import shutil
from zipfile import ZipFile
from shutil import make_archive
import configparser

drc = "D:\GIT\sampleapp"

for dirpath, dirname, filename in os.walk(drc):
        #Getting a list of the full paths of files
        
        for fname in filename:
            path = os.path.join(dirpath, fname) #Joining dirpath and filenames
            # if fname == 'app.conf':
            #     config_parser = configparser.SafeConfigParser()
            #     config_file_path = r''+os.path.join(dirpath, fname)
            #     config_parser.read(config_file_path)
            # print ("path-> "+path)
            if fname == 'app.conf':
                    config_file_path = r''+os.path.join(dirpath, fname)
                    days_file = open(config_file_path,'r')
                    days = days_file.read()
                    print (days)
                    strg = open(path)
                    strg = strg.read() #Opening the files for reading only
                    # if re.search(pattern, strg):#If we find the pattern ....
                    #     #shutil.copy2(path, backup) #we will create a backup of it
                    #     strg = strg.replace(oldstr, newapp_name) #We will create the replacement condistion
                    #     f = open(path, 'w') #We open the files with the WRITE option
                    #     f.write(strg) # We are writing the the changes to the files
                    #     #print (strg)
                    #     f.close() #Closing the files
