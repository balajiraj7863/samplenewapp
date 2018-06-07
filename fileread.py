import re
import argparse
import sys, os
import shutil
from zipfile import ZipFile
from shutil import make_archive
import configobj

drc = "D:\\sv1007\\app"

print (drc)
for dirpath, dirname, filename in os.walk(drc):
    #Getting a list of the full paths of files
    #print (filename)
    for fname in filename:
            print (fname)
            path = os.path.join(dirpath, fname) #Joining dirpath and filenames
            if fname == 'app.conf':
                print (os.path.join(dirpath, fname))
                config = configobj.ConfigObj(os.path.join(dirpath, fname))
                print (config['ui']['label'])
            #strg = open(path)
            #strg = strg.read() #Opening the files for reading only
