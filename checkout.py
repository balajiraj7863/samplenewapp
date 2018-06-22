import re
import argparse
import sys, os
import svn
import subprocess

def checkout_and_build(**kwargs):
    path_name=kwargs['pathVar']
    repo = svn.remote.RemoteClient("https://vm-srv1007.prodapt.com/svn/CWC-Dashboard/2.Project_Developments/SourceCode/SplunkUI/branch");
    repo.checkout("/GD-CICD");
    subprocess.call(["svn", "commit", path_name, '-m "commit ne  w zip files"'], shell = True)


if __name__=="__main__":
    parser = argparse.ArgumentParser(description='Replace string from source')
    parser.add_argument('--sourcePath',help="path to start change",required=True)

    vars=parser.parse_args()

    pathValue=vars.pathVar.strip()

    checkout_and_build(pathVar=pathValue)