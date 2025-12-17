import { StyleSheet, FlatList, View, Text, Button } from 'react-native';
import { useState } from 'react';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [editingGoalId, setEditingGoalId] = useState(null);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
    setEditingGoalId(null);
    setEnteredGoalText('');
  }

  function addGoalHandler(enteredText) {
    if (!enteredText.trim()) return;

    if (editingGoalId) {
      setCourseGoals((currentGoals) =>
        currentGoals.map((goal) =>
          goal.id === editingGoalId
            ? { ...goal, text: enteredText }
            : goal
        )
      );
      setEditingGoalId(null);
    } else {
      setCourseGoals((currentGoals) => [
        ...currentGoals,
        { text: enteredText, id: Math.random().toString() },
      ]);
    }

    endAddGoalHandler(); // ✅ close modal
  }

  function deleteGoalHandler(id) {
    setCourseGoals((currentGoals) =>
      currentGoals.filter((goal) => goal.id !== id)
    );
  }

  function updateGoalHandler(id) {
    const goalToEdit = courseGoals.find((goal) => goal.id === id);
    if (!goalToEdit) return;

    setEnteredGoalText(goalToEdit.text);
    setEditingGoalId(id);
    setModalIsVisible(true);
  }

  return (
    <View style={styles.appContainer}>
      <Text style={styles.title}>Goal Manager App</Text>

      <Button
        title="Add New Goal"
        color="#23e2ffff"
        onPress={startAddGoalHandler}
      />

      <GoalInput
        visible={modalIsVisible}
        onAddGoal={addGoalHandler}
        onCancel={endAddGoalHandler}
        enteredGoalText={enteredGoalText}
        setEnteredGoalText={setEnteredGoalText}
        editingGoalId={editingGoalId}
      />

      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoals}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <GoalItem
              id={itemData.item.id}
              text={itemData.item.text}
              onUpdate={updateGoalHandler}
              onDelete={deleteGoalHandler}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#9670ffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#b8e4eaff',
  },
  goalsContainer: {
    flex: 1,
  },
});
