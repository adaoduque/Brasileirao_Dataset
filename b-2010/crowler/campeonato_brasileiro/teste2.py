reorderlist = [ 'Cruzeiro', 'Santos', 'São Paulo', 'São Caetano', 'Coritiba-pr', 'Internacional', 
                'Atlético-mg', 'Flamengo', 'Goiás', 'Paraná', 'Figueirense', 'Atlético-pr', 'Guarani', 
                'Criciúma', 'Corinthians', 'Vitória', 'Vasco', 'Juventude', 'Fluminense', 'Grêmio', 
                'Ponte Preta', 'Paysandu', 'Fortaleza', 'Bahia']
listIndex   = []

#Processa a lista para gerar a lista de ordenação
for clube in reorderlist:
    for index, row in dfTable.iterrows():
        #Verifica se o valor de clube é um unicode, se não, convete isso.
        if type(clube) != unicode:
            c =  clube.decode('utf-8')
        else:
            c =  clube
        
        c1  =  row['Clubes']
        if type(c1) != unicode:
            c1 =  c1.decode('utf-8')
        
        c1 =  c1.strip()
        c  =  c.lower()
        
        #Verifica se o clube iterado é igual ao clube da lista, se sim
        #retorna seu indice
        if c1 == c:
            listIndex.append( index )
            break

#Reordena a lista
dfTable.reindex(index=listIndex, columns=["Clubes", "PG", "J", "V", "E", "D", "GP", "GC", "SG"])
#Com a lista ordenada, corrige os indices.
dfTable.index =  np.arange(1, len(dfTable)+1)
dfTable