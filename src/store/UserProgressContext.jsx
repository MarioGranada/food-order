import { createContext, useState } from 'react';

const initCtx = {
  progress: '',
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
};

const UserProgressContext = createContext(initCtx);

export const UserProgressContextProvider = ({ children }) => {
  const [userProgress, setUserProgress] = useState('');

  const showCart = () => {
    setUserProgress('cart');
  };

  const hideCart = () => {
    setUserProgress('');
  };

  const showCheckout = () => {
    setUserProgress('checkout');
  };

  const hideCheckout = () => {
    setUserProgress('');
  };

  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
};

export default UserProgressContext;
