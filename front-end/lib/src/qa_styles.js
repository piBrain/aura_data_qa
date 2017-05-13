
export const restRequestBoxStyle = {
  topLevelForm: {
    width: '80%',
    marginLeft: '7.5%',
    marginBottom: '0',
    flex: '1 0 0',
  },
  controlLabel: {
  },
}

export const dataBoxStyle = {
  topLevelWell: {
    width: '80%',
    marginLeft: '7.5%',
    flex: '1.4 0 0',
    overflowY: 'scroll',
  },
  listGroup: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  }
}

export const validationButtonStyle = {
  topLevelButton: {
    width: '80%',
    marginLeft: '7.5%',
    flex: '0.1 0 0',
  },
}

export const qaEntryStyle = {
  topLevelDiv: {
    marginTop: '1%',
    flex: '1 0 0',
    height: '90%',
    order: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignIterms: 'center',
  }
}

export const webpageBoxStyle = {
  topLevelDiv: {
    flex: '1 0 0',
    order: 2,
  },
  iFrame: {
    width: '100%',
    height: '100%',
  },
}

export const wrapperStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'space-around',
  width: '100%',
  height: '100%',
}


export const addFieldStyle = (props, order) => {
  let visibility = props.in_validation ? 'hidden' : 'visible'
    return  {
      topLevelButton: {
        margin: '0',
        flex: '0.95 0 0',
        fontSize: '0.65em',
        order,
        visibility,
      },
    }
}

export const addFieldWrapperStyle ={
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'space-around',
  width: '80%',
  height: '5%',
  marginLeft: '7.5%',
  marginBottom: '1%',
} 
