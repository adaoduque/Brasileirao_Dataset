def getNumberWinner(data, clube ):
    df = data.apply(lambda x: x.str.strip())
    filter = df["Vencedor"].str.lower() == clube
    return (data[filter]['Vencedor'].count()).astype(np.int64)

def getNumberDepartures(data, clube ):
    df = data.apply(lambda x: x.str.strip())
    filter1 = df["Clube 1"].str.lower() == clube
    filter2 = df["Clube 2"].str.lower() == clube
    return (df[filter1]['Clube 1'].count() + df[filter2]['Clube 2'].count()).astype(np.int64)

def getPoints(data, clube ):
    df = data.apply(lambda x: x.str.strip())
    filter1 = data["Clube 1"].str.lower() == clube
    filter2 = data["Clube 2"].str.lower() == clube
    filter3 = data["Vencedor"].str.lower() == clube
    filter4 = (data["Clube 1"].str.lower() == clube) | (data["Clube 2"].str.lower() == clube)
    filter5 = data["Vencedor"].str.lower() == '-'
    
    v1 = data[(filter1) & (filter3)]
    v1 = v1['Vencedor'].count()
    v2 = data[(filter2) & (filter3)]
    v2 = v2['Vencedor'].count() 
    v3 = data[(filter4) & (filter5)]
    v3 = v3['Vencedor'].count()
    return ((v2*3)+(v1*3)+v3).astype(np.int64)

def getDraw(data, clube ):
    df = data.apply(lambda x: x.str.strip())
    filter1 = (data["Clube 1"].str.lower() == clube) | (data["Clube 2"].str.lower() == clube)
    filter2 = data["Vencedor"].str.lower() == '-'
    df = data[(filter1) & (filter2)]
    empates = df['Vencedor'].count()
    return empates.astype(np.int64)

def getDefeats(data, clube ):
    df = data.apply(lambda x: x.str.strip())
    filter1 = (data["Clube 1"].str.lower() == clube) | (data["Clube 2"].str.lower() == clube)
    filter2 = (data["Vencedor"].str.lower() != clube) & (data["Vencedor"].str.lower() != '-')
    df = data[(filter1) & (filter2)]
    derrotas = df['Vencedor'].count()
    return derrotas.astype(np.int64)

def getGP(data, clube ):
    df = data.apply(lambda x: x.str.strip())
    filter1  =  data["Clube 1"].str.lower() == clube
    filter2  =  data["Clube 2"].str.lower() == clube
    df1      =  data[(filter1)]
    df2      =  data[(filter2)]
    placar1  =  df1['Placar'].str.split('x')
    placar2  =  df2['Placar'].str.split('x')
    gp       =  0
    gc       =  0
    for g1, g2 in placar1:
        gp = (gp + pd.to_numeric( g1 ))
        gc = (gc + pd.to_numeric( g2 ))
            
    for g1, g2 in placar2:
        gp = (gp + pd.to_numeric( g2 )) 
        gc = (gc + pd.to_numeric( g1 ))
    return gp, gc