import re
import argparse
import sys, os
import shutil
from zipfile import ZipFile
from shutil import make_archive
import configparser

def replace_string(**kwargs):
    path_name=kwargs['pathVar']
    zip_path=kwargs['zipPathVar']
    newapp_name=kwargs['newappName']
    oldstr=kwargs['oldappName']
    #version_name=kwargs['newVersion']
    drc = path_name
    backup = path_name+'/tmp'
    pattern = re.compile(oldstr)

    #print ("path-> name "+path_name)
    #print ("appNameappNameappName ----> "+newapp_name)

    for dirpath, dirname, filename in os.walk(drc):
        #Getting a list of the full paths of files
        
        for fname in filename:
            path = os.path.join(dirpath, fname) #Joining dirpath and filenames
            # if fname == 'app.conf':
            #     configParser = configparser.ConfigParser()
            #     configFilePath = r''+os.path.join(dirpath, fname)
            #     configParser.read(configFilePath)
            #print ("path-> "+path)
            strg = open(path)
            strg = strg.read() #Opening the files for reading only
            if re.search(pattern, strg):#If we find the pattern ....
                shutil.copy2(path, backup) #we will create a backup of it
                strg = strg.replace(oldstr, newapp_name) #We will create the replacement condistion
                f = open(path, 'w') #We open the files with the WRITE option
                f.write(strg) # We are writing the the changes to the files
                #print (strg)
                f.close() #Closing the files
    # archiev the files
    shutil.make_archive(newapp_name,"zip", zip_path) ## archiev the files zip
    # archiev the files final


if __name__=="__main__":
    parser = argparse.ArgumentParser(description='Replace string from source')
    parser.add_argument('--version',help="Release Version you are going to deploy")
    parser.add_argument('--pathVar',help="path to start change",required=True)
    parser.add_argument('--zipPathVar',help="path to artifacts",required=True)
    parser.add_argument('--appName',help="new name for splunk app",required=True)
    parser.add_argument('--oldappName',help="old name for splunk app",required=True)

    vars=parser.parse_args()

    pathValue=vars.pathVar.strip()
    zipPathValue=vars.zipPathVar.strip()
    appName=vars.appName.strip()
    oldName=vars.oldappName.strip()

    replace_string(pathVar=pathValue, zipPathVar=zipPathValue, oldappName=oldName, newappName=appName)

    #replace_string(pathVar='../sampleapp/app', zipPathVar='../sampleapp/app', oldappName='Global_Dashboard_V3', newappName='SplunkUI-PRODv1')
