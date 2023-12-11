import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { useChangePasswordMutation, useCreateAuthTokenMutation, useLazyRetrieveUserQuery } from 'src/services/api';


const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const [getToken,{isLoading:isGettingToken}] = useCreateAuthTokenMutation()
  const [getUser,{isFetching,isLoading:isLoadingUser}] = useLazyRetrieveUserQuery()
  const [changeThePassword,{isLoading:isChangingPassword}] = useChangePasswordMutation()

  

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.localStorage.getItem('authenticated') === 'true';
      
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      let user = window.sessionStorage.getItem("abcUser")
      if (user){
        dispatch({
          type: HANDLERS.INITIALIZE,
          payload: JSON.parse(user)
        });
      }

      
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  

  const signIn = async (username, password) => {
    

    await getToken({username,password}).unwrap().then(
      token => {
        const {access,refresh} = token
        localStorage.setItem("accessToken",access);
        localStorage.setItem("refreshToken",refresh);
        getUser().unwrap().then(user => {

          try{
            window.sessionStorage.setItem('abcUser', JSON.stringify(user));
          }catch(e){

          }
          
          dispatch({
            type: HANDLERS.SIGN_IN,
            payload: user
          });
        })
        
        try {
          
          window.localStorage.setItem('authenticated', 'true');
        } catch (err) {
          console.error(err);
        }

      },
      err => { 
        if(err.status == 401){
          throw new Error ("Wrong username or password")
        }
        throw new Error(JSON.stringify(err))
      }
    )

    

    

    
  };

  const changePassword = async (old_password,password,confirm_password,user_id) => {
    

    await changeThePassword({old_password,password,confirm_password,user_id}).unwrap().then(
      token => {
        
        
        console.log(token)

      },
      err => { 
        if(err.status == 400){
          throw new Error (err.data.detail[0])
        }
        throw new Error(JSON.stringify(err)) 
        console.log(err)
      }
    )

    

    

    
  };

  /* const signUp = async (email, name, password) => {
    throw new Error('Sign up is not implemented');
  }; */

  const signOut = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.setItem("authenticated","false")
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        //skip,
        signIn,
        //signUp,
        signOut,
        changePassword,
        isLoading: isChangingPassword || isFetching || isGettingToken || isLoadingUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
