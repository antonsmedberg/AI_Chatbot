# preprocess.py
import pandas as pd

def preprocess_data(file_path):
    df = pd.read_csv(file_path)
    # Add your preprocessing steps here
    # Example: df['input_text'] = df['input_text'].apply(lambda x: x.lower())
    return df

if __name__ == '__main__':
    df = preprocess_data('data/conversations.csv')
    df.to_csv('data/processed_conversations.csv', index=False)
