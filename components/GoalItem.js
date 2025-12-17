import { View, Text, StyleSheet, Pressable, } from "react-native";
import { StatusBar } from "expo-status-bar";
function GoalItem(props) {
   
  return (
   <>  
      <StatusBar style="inverted" />
    <View  style={styles.goalItem}>
      <Text style={styles.goalText}>{props.text}</Text>

      <View style={styles.actions}>
        <Pressable
        android_disableSound={true}
          onPress={() => props.onUpdate(props.id)}
          style={({ pressed }) => [
            styles.button,
            styles.updateButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.buttonText}>Update</Text>
        </Pressable>

        <Pressable
          onPress={() => props.onDelete(props.id)}
          style={({ pressed }) => [
            styles.button,
            styles.deleteButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
      </View>
    </View>
</>
  );
}

export default GoalItem;


const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#6319ccff',
  },
  goalText: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 8,
  },
  updateButton: {
    backgroundColor: '#f5a623',
  },
  deleteButton: {
    backgroundColor: '#e63946',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.7,
  },
});

