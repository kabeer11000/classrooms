import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  component: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 15,
  },
  textTitle: {
    fontSize: 30,
  },
  title2: {
    fontSize: 26,
  },
  textSubTitle: {
    fontSize: 18,
  },
});

const globalColors = {
  Dark: '#343a40',
  Gray: '#50555a',
  LightGray: '#2E2F33',
  Secondary: '#6c757a',
  Light: '#f8f9fa',
  Danger: '#dc3545',
  Success: '#28a745',
  Primary: '#1B98F5',
  Info: '#5bc0de',
  Warning: '#f0ad4e',
  Aqua: '#5DA3FA',
};

export {globalStyles, globalColors};
