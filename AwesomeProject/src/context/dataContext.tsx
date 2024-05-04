import React from 'react';
import {createContext} from 'react';

export const DataContext = createContext<any>(null);

export const DataProvider = ({children}: any) => {
  const [generalInstruction, setGeneralInstruction] = React.useState<String>();
  const [foodHabits, setFoodHabits] = React.useState<String>();
  const [advInstructions, setAdvInstructions] = React.useState<String>();

  const handleOnPress = () => {
    const diagnosisData = {
      generalInstruction,
      foodHabits,
      advInstructions,
    };
    console.log(diagnosisData);
  };

  return (
    <DataContext.Provider
      value={{
        generalInstruction,
        setGeneralInstruction,
        foodHabits,
        setFoodHabits,
        advInstructions,
        setAdvInstructions,
        handleOnPress,
      }}>
      {children}
    </DataContext.Provider>
  );
};
