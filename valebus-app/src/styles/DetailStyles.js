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
  },
  // Adicione esses styles ao seu StyleSheet.create({})

mapCard: {
  backgroundColor: '#FFF',
  marginHorizontal: 16,
  marginTop: 16,
  marginBottom: 8,
  borderRadius: 12,
  overflow: 'hidden',
  borderWidth: 0.5,
  borderColor: '#dde8dd',
},
mapPlaceholder: {
  height: 140,
  backgroundColor: '#e8ede8',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
},
mapLabel: {
  color: '#1A4019',
  fontSize: 14,
  fontWeight: '500',
  marginTop: 8,
},
mapCaption: {
  padding: 10,
  fontSize: 12,
  color: '#666',
  textAlign: 'center',
  borderTopWidth: 0.5,
  borderTopColor: '#e8ede8',
},
scheduleCard: {
  backgroundColor: '#FFF',
  marginHorizontal: 16,
  marginBottom: 16,
  borderRadius: 12,
  borderWidth: 0.5,
  borderColor: '#dde8dd',
  overflow: 'hidden',
},
tabContainer: {
  flexDirection: 'row',
  borderBottomWidth: 0.5,
  borderBottomColor: '#dde8dd',
},
tab: {
  flex: 1,
  paddingVertical: 12,
  alignItems: 'center',
  borderBottomWidth: 2,
  borderBottomColor: 'transparent',
},
tabAtiva: {
  borderBottomColor: '#A1BF34',
},
tabTexto: {
  fontSize: 13,
  color: '#666',
},
tabTextoAtivo: {
  color: '#1A4019',
  fontWeight: '500',
},
subLinhaSection: {
  padding: 16,
},
subLinhaBorder: {
  borderTopWidth: 0.5,
  borderTopColor: '#eef2ee',
},
subLinhaHeader: {
  marginBottom: 12,
},
subLinhaCodigo: {
  fontSize: 13,
  fontWeight: '500',
  color: '#A1BF34',
  marginBottom: 2,
},
subLinhaOrigem: {
  fontSize: 15,
  fontWeight: '500',
  color: '#0C2612',
},
sentidoBadge: {
  alignSelf: 'flex-start',
  marginTop: 4,
  backgroundColor: '#eaf3de',
  paddingHorizontal: 8,
  paddingVertical: 2,
  borderRadius: 20,
},
sentidoTexto: {
  fontSize: 11,
  color: '#3a6b39',
},
horarioRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 10,
  borderBottomWidth: 0.5,
  borderBottomColor: '#f0f4f0',
},
horarioTime: {
  fontSize: 15,
  fontWeight: '500',
  color: '#1A4019',
},
horarioObs: {
  fontSize: 12,
  color: '#888',
  fontStyle: 'italic',
},
});