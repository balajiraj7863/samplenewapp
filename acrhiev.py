import re
import argparse
import sys, os
import shutil
from zipfile import ZipFile
from shutil import make_archive
import configparser

dir = os.path.dirname('D://GIT//sampleapp//newapp')
print (os.path.exists(dir))
print dir
#if not os.path.exists(dir):
os.makedirs(dir)

#shutil.copy('D:/GIT/sampleapp/app', 'D:/GIT/sampleapp/newapp')
#shutil.make_archive('D:/GIT/sampleapp',"zip", 'D:/GIT/sampleapp/app')
os.rmdir("D:/GIT/sampleapp/newapp")
