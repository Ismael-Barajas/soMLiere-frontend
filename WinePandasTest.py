import numpy as np
import matplotlib.pyplot as plt
from numpy.linalg import inv
from IPython.display import Markdown as md

import sklearn as sk
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import CategoricalNB
from sklearn.naive_bayes import GaussianNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import confusion_matrix
from sklearn.metrics import roc_auc_score


data = pd.read_csv(r'C:\Users\dsyen\Desktop\AI Project\winequalityN.csv')

#Split data between white and red wine
dataWhite = data.iloc[:4899,:]
dataRed = data.iloc[4900:,:]
print(dataWhite.head(5))
print(dataRed.head(5))


#Create histogram
#data.hist(bins = 25,figsize=(10,10), color = "red", ec = "red" )
#plt.show()

#Create plot for relationship between pH and quality
plt.figure(figsize=[10,10])
plt.bar(data['quality'], data['alcohol'], color='blue', ec = 'blue')
plt.xlabel('quality')
plt.ylabel('pH ')
plt.show()

#Find correlations between all the feautures using a heatmap
plt.figure(figsize=[19,10], facecolor='blue')
sb.heatmap(data.corr(),annot = True)
plt.show()
