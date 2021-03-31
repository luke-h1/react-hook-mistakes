import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./App.css";

/* 
Rules 
* Always use the setter for useState - never set the value directly 
* Always put a dependency array on useEffect, useCallback & useMemo
* To run useEffect only once use an empty array
* Don't depend on data you set (not a no no just make sure you're using it in the right way)
* Always add all the state you read from to the dependency array
*/

const MyComponent: React.FC<{}> = () => {
  const [numbers, setNumbers]: any = useState([]);

  useEffect(() => {
    fetch("/numbers.json")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(`Data - ${JSON.stringify(data)}`);
        setNumbers(data);
      });
  }, []);

  const addOne = useCallback(() => {
    setNumbers((currentNumbers: any) => [...currentNumbers, currentNumbers.length + 1]);
  }, []);

  const sum = useMemo(() => numbers.reduce((a: any, v: any) => a + v, 0), [numbers])

  return (
    <div>
      <h1>Numbers: {JSON.stringify(numbers)}</h1>
      <div>Sum: {sum}</div>
      <button onClick={addOne}>Add one</button>
    </div>
  );
};

export const App: React.FC<{}> = () => {
  return (
    <div className="App">
      <MyComponent />
    </div>
  );
};
