import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
// import GoalItem from './components/GoalItem';
// import GoalInput from './components/GoalInput';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={err => console.log(err)}
      />
    );
  }

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };
  // const [courseGoals, setCourseGoals] = useState([]);
  // const [isAddMode, setIsAddMode] = useState(false);

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestart={configureNewGameHandler}
      />
    );
  }

  // const addGoalHandler = goalTitle => {
  //   setCourseGoals(currentGoals => [
  //     ...currentGoals,
  //     { id: Math.random().toString(), value: goalTitle }
  //   ]);
  //   setIsAddMode(false);
  // };

  // const removeGoalHandler = goalId => {
  //   setCourseGoals(currentGoals => {
  //     return currentGoals.filter(goal => goal.id !== goalId);
  //   });
  // };

  // const cancelGoalAdditionHandler = () => {
  //   setIsAddMode(false);
  // };

  return (
    <View style={styles.screen}>
      <Header title='Guess a Number' />
      {content}
      {/* <StartGameScreen />
      <GameScreen /> */}
      {/* <Button
        title='Add New Inventory Item'
        onPress={() => setIsAddMode(true)}
      /> */}
      {/* <GoalInput
        visible={isAddMode}
        onAddGoal={addGoalHandler}
        onCancel={cancelGoalAdditionHandler}
      />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={itemData => (
          <GoalItem
            id={itemData.item.id}
            onDelete={removeGoalHandler}
            title={itemData.item.value}
          />
        )}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
