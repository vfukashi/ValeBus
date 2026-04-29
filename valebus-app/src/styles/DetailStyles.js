import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#0C2612',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lineTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  routeInfo: {
    padding: 20,
    backgroundColor: '#E5EEE5', // Cinza clarinho
  },
  routeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A4019',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    color: '#0C2612',
  },
  scheduleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
  },
  timeCard: {
    backgroundColor: '#F0F5F0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    margin: 5,
    borderWidth: 1,
    borderColor: '#A1BF34', // Borda verde limão
  },
  timeText: {
    fontWeight: 'bold',
    color: '#1A4019',
  }
});