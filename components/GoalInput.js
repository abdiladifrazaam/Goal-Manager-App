import { View, StyleSheet,Image, Button, TextInput, Alert, Modal } from "react-native";

function GoalInput(props) {
  const {
    enteredGoalText,
    setEnteredGoalText,
    onAddGoal,
    editingGoalId,
    onCancel,
    visible,
  } = props;

  function goalInputHandler(text) {
    setEnteredGoalText(text);
  }

  function addGoalHandler() {
    if (!enteredGoalText.trim()) {
      Alert.alert(
        "Invalid input",
        "Please enter a goal before adding.",
        [{ text: "Okay" }]
      );
      return; // ✅ important P01119148
    }

    onAddGoal(enteredGoalText);
  }

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          source={require('../assets/images/goal.png')}
          style={{ width: 100, height: 100, margin: 20 }}
        />
        <TextInput
          value={enteredGoalText}
          onChangeText={goalInputHandler}
          style={styles.textInput}
          placeholder="Your Course Goal!"
        />

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title={editingGoalId ? "Update Goal" : "Add Goal"}
              onPress={addGoalHandler}
            />
          </View>

          <View style={styles.button}>
            <Button title="Cancel" color="red" onPress={onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#311b6b',
  
  },
  textInput: {
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 6,
    width: '100%',
    padding: 8,
    marginBottom: 12,
    color: '#ffffff',
    backgroundColor: '#4e2388ff',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    minWidth: 100,
    marginHorizontal: 8,
  },
});
