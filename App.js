import { StyleSheet, FlatList,  View,Text} from 'react-native';
import { useState } from 'react';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
const [enteredGoalText, setEnteredGoalText] = useState('');
  const [editingGoalId, setEditingGoalId] = useState(null);
 

function addGoalHandler(enteredText) {
  if (!enteredText.trim()) return;

  if (editingGoalId) {
    // Update existing goal
    setCourseGoals((currentGoals) =>
      currentGoals.map((goal) =>
        goal.id === editingGoalId
          ? { ...goal, text: enteredText }
          : goal
      )
    );
    setEditingGoalId(null); // reset editing
  } else {
    // Add new goal
    setCourseGoals((currentGoals) => [
      ...currentGoals,
      { text: enteredText, id: Math.random().toString() },
    ]);
  }

  setEnteredGoalText(''); // clear input
}

  function deleteGoalHandler(id) {
  setCourseGoals((currentCourseGoals) =>
    currentCourseGoals.filter((goal) => goal.id !== id)
  );
}

function updateGoalHandler(id) {
  const goalToEdit = courseGoals.find((goal) => goal.id === id);
  if (!goalToEdit) return;

  setEnteredGoalText(goalToEdit.text); // populate TextInput
  setEditingGoalId(id);                 // mark this goal as editing
}


  return (

    <View>
      <Text style={{fontSize:24, fontWeight:'bold', textAlign:'center', marginBottom:20}}>Goal Manager App</Text>
           
    </View>
    ,
    <View style={styles.appcontainer}>
     
 <GoalInput
  onAddGoal={addGoalHandler}
  enteredGoalText={enteredGoalText}
  setEnteredGoalText={setEnteredGoalText}
  editingGoalId={editingGoalId}
/>

      <View style={styles.goalsContainer}>
       <FlatList
  alwaysBounceVertical={false}
  data={courseGoals}
  renderItem={(itemData) => {
    return (
      <GoalItem
        id={itemData.item.id}
        text={itemData.item.text}
        onUpdate={updateGoalHandler}
        onDelete={deleteGoalHandler}
      />
      
    );
  }}
  keyExtractor={(item) => item.id}
/>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appcontainer: {
    flex: 1,
    padding: 30,
    marginTop: 50,
    backgroundColor: '#fff',
    borderBottomColor: '#cccccc',
  },

 

  



});
