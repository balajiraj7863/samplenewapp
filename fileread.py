import re
import argparse
import sys, os
import shutil
from zipfile import ZipFile
from shutil import make_archive
from configobj import ConfigObj

drc = "D:\GIT\sampleapp"


for dirpath, dirname, filename in os.walk(drc):
        #Getting a list of the full paths of files
    for fname in filename:
            path = os.path.join(dirpath, fname) #Joining dirpath and filenames
            if fname == 'app.conf':
                print (os.path.join(dirpath, fname))
                config = ConfigObj(os.path.join(dirpath, fname))
                print (config['ui']['label'])
            #strg = open(path)
            #strg = strg.read() #Opening the files for reading only
