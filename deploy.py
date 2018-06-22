import re, io
import argparse
import sys, os
import splunklib.client as client
 
def deploy_app(**kwargs):
    path_name=kwargs['pathVar']
    args = {'host':'192.168.44.30','port':8089,'username':'admin','password':'we1c@me'}
    service = client.connect(**args)  
    params = {'name':path_name}
    service.post('apps/appinstall',**params)
         
if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Replace string from source')
    parser.add_argument('--pathVar',help="path from app install",required=True)

    vars=parser.parse_args()

    pathValue=vars.pathVar.strip()

    deploy_app(pathVar=pathValue);