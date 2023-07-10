import os

while 1:
    name = input('Project Name')
    folder_path = 'src/' + name.replace(" ", "_")

    try:
        os.mkdir(folder_path)
    except FileExistsError:
        pass

    with open(f'{folder_path}/README.md', 'w', encoding='utf8') as file:
        file.write(f"""# {name} | ...

    ...

    ## 前置

    - 模組
    - ...
    - KubeJS本地通用庫
    - ...""")
    
    if input('continue?').lower() in {'n', 'no'}:
        break