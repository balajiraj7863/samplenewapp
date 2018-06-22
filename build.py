import re, io
import argparse
import sys, os
import shutil
from zipfile import ZipFile
import shutil
import configobj

def replace_string(**kwargs):
    path_name=kwargs['pathVar']
    zip_path=kwargs['zipPathVar']
    newapp_name=kwargs['newappName']
    archive_format=kwargs['archiveFormat']
    old_app_name='';
    drc = path_name

    print ("path-> name "+path_name)
    print ("appNameappNameappName ----> "+newapp_name)

    
    for dirpath, dirname, filename in os.walk(drc):
        #Getting a list of the full paths of files
        for fname in filename:
            path = os.path.join(dirpath, fname) #Joining dirpath and filenames
            if fname == 'app.conf':
                config = configobj.ConfigObj(os.path.join(dirpath, fname))
                print ("path ----->>>>"+os.path.join(dirpath, fname))
                if ('' != config['ui']['label']):
                    old_app_name=config['ui']['label']
                    print (old_app_name)
                    pattern = re.compile(old_app_name)
    

    for dirpath, dirname, filename in os.walk(drc):
        #Getting a list of the full paths of files
        for fname in filename:
            path = os.path.join(dirpath, fname) #Joining dirpath and filenames
            if '' != old_app_name:
                strg = open(path, 'r')
                strg = strg.read() #Opening the files for reading only
                if re.search(pattern, strg):#If we find the pattern ....
                    strg = strg.replace(old_app_name, newapp_name) #We will create the replacement condition
                    f = open(path, 'w') #We open the files with the WRITE option
                    f.write(strg) # We are writing the the changes to the files
                    f.close() #Closing the files
    shutil.copytree(path_name, zip_path+"/"+newapp_name)
    # archiev the files
    shutil.make_archive(zip_path+"/"+newapp_name,archive_format, zip_path+"/"+newapp_name) ## archiev the files zip
    # archiev the files final


if __name__=="__main__":
    parser = argparse.ArgumentParser(description='Replace string from source')
    parser.add_argument('--version',help="Release Version you are going to deploy")
    parser.add_argument('--pathVar',help="path to start change",required=True)
    parser.add_argument('--zipPathVar',help="path to artifacts",required=True)
    parser.add_argument('--appName',help="new name for splunk app",required=True)
    parser.add_argument('--archiveFormat',help="format for app package",required=True)

    vars=parser.parse_args()

    pathValue=vars.pathVar.strip()
    zipPathValue=vars.zipPathVar.strip()
    appName=vars.appName.strip()
    archiveFormatValue=vars.archiveFormat.strip()

    replace_string(pathVar=pathValue, zipPathVar=zipPathValue, newappName=appName, archiveFormat=archiveFormatValue)

