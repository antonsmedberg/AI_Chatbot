# train.py
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import pandas as pd

def train_model(data_path):
    df = pd.read_csv(data_path)
    # Assume df has columns 'features' and 'target'
    X = df['features']
    y = df['target']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    
    clf = RandomForestClassifier()
    clf.fit(X_train, y_train)
    
    # Evaluate the model
    score = clf.score(X_test, y_test)
    print(f'Model accuracy: {score}')
    
    # Save the model
    pd.to_pickle(clf, 'models/chat_model.pkl')

if __name__ == '__main__':
    train_model('data/processed_conversations.csv')
