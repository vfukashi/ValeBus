import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: COLORS.darkest, // #0C2612
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 25,
  },
  searchBar: {
    backgroundColor: COLORS.whitish, // #E5EEE5
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 20,
  },
  menuIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  menuItem: {
    backgroundColor: COLORS.dark, // #1A4019
    width: '30%',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 4,
  },
  menuText: {
    color: COLORS.whitish,
    fontSize: 10,
    marginTop: 5,
    fontWeight: 'bold',
  },
  lineCard: {
    backgroundColor: COLORS.whitish, // #E5EEE5
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderLeftWidth: 6,
    borderLeftColor: COLORS.light, // #A1BF34
  },
  circleNumber: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: COLORS.darkest,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  }
});