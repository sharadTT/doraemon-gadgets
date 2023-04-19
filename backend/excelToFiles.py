import pandas as pd

# Read the Excel file
df = pd.read_excel('Gadgets.xlsx', index_col=None, header=None)

# Loop through each cell in the DataFrame and save its content to a text file
for i in range(len(df.index)):
    for j in range(len(df.columns)):
        cell_content = str(df.iloc[i, j])
        if j == 0:
            file_name = f'{i+1}.txt'
        if j == 1:
            file_name = f'{i+1}-info.txt'
        #file_name = f'cell_{i+1}_{j+1}.txt'
        with open(file_name, 'w') as f:
            f.write(cell_content)
