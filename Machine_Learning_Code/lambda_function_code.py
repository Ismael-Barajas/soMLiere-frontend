import boto3
import json
#from botocore.vendored import requests

import numpy as np
from numpy.linalg import inv
import pandas as pd

import urllib3



from sklearn.model_selection import train_test_split



def lambda_handler(event, context):
    
    
    #response = requests.get('s3://somliere/data.csv')
    #original_object = response.content.decode('utf-8')
    
    data = pd.read_csv(filepath_or_buffer= 'https://somlierebucket.s3.us-west-1.amazonaws.com/data.csv', delimiter=',')
    data = data.dropna(axis= 0, how= 'any')
    binary_data = data.replace({'white':1, 'red':0})
    white_mask = binary_data['type'] == 1
    w_data = binary_data[white_mask]
    r_data = binary_data[~white_mask]
    #remove the now-useless feature since the data is split by type into two data sets
    r_data = r_data.drop(columns='type')
    w_data = w_data.drop(columns='type')
    
    w_train, w_test = train_test_split(w_data, test_size=0.3, train_size=0.7, random_state=(2021-10-25), shuffle=True, stratify=None)
    r_train, r_test = train_test_split(r_data, test_size=0.3, train_size=0.7, random_state=(2021-10-25), shuffle=True, stratify=None)
    
    #randomnumber = np.random.randint(0, quality.size, size= int(quality.size/30))
    #randomnumber[::-1].sort()
    
    
    y_w_test = w_test.pop('quality')
    y_w_train = w_train.pop('quality')
    y_r_test = r_test.pop('quality')
    y_r_train = r_train.pop('quality')
         #stack ones
    w_train.insert(loc=0, column='intercept', value=1)
    r_train.insert(loc=0, column='intercept', value=1)
    w_test.insert(loc=0, column='intercept', value=1)
    r_test.insert(loc=0, column='intercept', value=1)
    #solve linear models
    w_weights = np.linalg.inv(w_train.transpose().dot(w_train)).dot(w_train.transpose()).dot(y_w_train)
    r_weights = np.linalg.inv(r_train.transpose().dot(r_train)).dot(r_train.transpose()).dot(y_r_train)
    #get their predictions for test data
    w_pred = np.dot(w_test,w_weights)
    r_pred = np.dot(r_test,r_weights)
    #compute MSE
    w_loss = ((w_pred - y_w_test)**2).mean()
    r_loss = ((r_pred - y_r_test)**2).mean()
    #avgs
    w_fixed_acidity = w_data['fixed acidity'].mean()
    w_volatile_acidity = w_data['volatile acidity'].mean()
    w_citric_acid = w_data['citric acid'].mean()
    w_residual_sugar = w_data['residual sugar'].mean()
    w_chlorides = w_data['chlorides'].mean()
    w_free_sulfur_dioxide = w_data['free sulfur dioxide'].mean()
    w_total_sulfur_dioxide = w_data['total sulfur dioxide'].mean()
    w_density = w_data['density'].mean()
    w_pH = w_data['pH'].mean()
    w_sulphates = w_data['sulphates'].mean()
    w_alcohol = w_data['alcohol'].mean()
    
    r_fixed_acidity = r_data['fixed acidity'].mean()
    r_volatile_acidity = r_data['volatile acidity'].mean()
    r_citric_acid = r_data['citric acid'].mean()
    r_residual_sugar = r_data['residual sugar'].mean()
    r_chlorides = r_data['chlorides'].mean()
    r_free_sulfur_dioxide = r_data['free sulfur dioxide'].mean()
    r_total_sulfur_dioxide = r_data['total sulfur dioxide'].mean()
    r_density = r_data['density'].mean()
    r_pH = r_data['pH'].mean()
    r_sulphates = r_data['sulphates'].mean()
    r_alcohol = r_data['alcohol'].mean()
       
    
    #construct values
    body = json.loads(event['body'])
    values = [0] * 12
    values[0] = 1
    values[1] = body["fixed_acidity"]
    values[2] = body["volatile_acidity"]
    values[3] = body["citric_acid"]
    values[4] = body["residual_sugar"]
    values[5] = body["chlorides"]
    values[6] = body["free_sulfur_dioxide"]
    values[7] = body["total_sulfur_dioxide"]
    values[8] = body["density"]
    values[9] = body["pH"]
    values[10] = body["sulphates"]
    values[11] = body["alcohol"]
    wine_type = body["type"]
    #fill NA
    if (wine_type == 'white'):
        if (values[1] == 'NA'):
            values[1] = w_fixed_acidity
        if (values[2] == 'NA'):
            values[2] = w_volatile_acidity
        if (values[3] == 'NA'):
            values[3] = w_citric_acid
        if (values[4] == 'NA'):
            values[4] = w_residual_sugar
        if (values[5] == 'NA'):
            values[5] = w_chlorides
        if (values[6] == 'NA'):
            values[6] = w_free_sulfur_dioxide
        if (values[7] == 'NA'):
            values[7] = w_total_sulfur_dioxide
        if (values[8] == 'NA'):
            values[8] = w_density
        if (values[9] == 'NA'):
            values[9] = w_pH
        if (values[10] == 'NA'):
            values[10] = w_sulphates
        if (values[11] == 'NA'):
            values[11] = w_alcohol
    #compute new score
        endscore = np.dot(values, w_weights)
    
    if (wine_type == 'red'):
        if (values[1] == 'NA'):
            values[1] = r_fixed_acidity
        if (values[2] == 'NA'):
            values[2] = r_volatile_acidity
        if (values[3] == 'NA'):
            values[3] = r_citric_acid
        if (values[4] == 'NA'):
            values[4] = r_residual_sugar
        if (values[5] == 'NA'):
            values[5] = r_chlorides
        if (values[6] == 'NA'):
            values[6] = r_free_sulfur_dioxide
        if (values[7] == 'NA'):
            values[7] = r_total_sulfur_dioxide
        if (values[8] == 'NA'):
            values[8] = r_density
        if (values[9] == 'NA'):
            values[9] = r_pH
        if (values[10] == 'NA'):
            values[10] = r_sulphates
        if (values[11] == 'NA'):
            values[11] = r_alcohol
    #compute new score
        endscore = np.dot(values, r_weights)
        
    
    return {
        "isBase64Encoded": False,
        "statusCode": 200,
        "headers": { "Content-Type": "application/json",  "Access-Control-Allow-Origin":"*" },
        "body": json.dumps({'score' : endscore})
    }
    