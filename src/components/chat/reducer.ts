const initialState = {
    data:[],
    loading:false,
    error:null
  }
  
  const Actions = {
    LoadingStart:'LoadingStart',
    FetchData:'FetchData',
    AppendData:'AppendData',
    Error:'Error',
  }
  
  const reducer = (state,action) => {
    switch(action.type){
      case Actions.LoadingStart : {
        return {...state,loading:true}
      }
      case Actions.FetchData : {
        return {...state,loading:false,data:action.payload}
      }
      case Actions.AppendData : {
        return {...state,data:[action.payload,...state.data]}
      }
      case Actions.Error : {
        return {...state,loading:false,error:action.payload}
      }
    }
  }

  export {
    reducer,Actions,initialState
  }