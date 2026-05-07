import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F6F2',
  },

  // Header
  header: {
    backgroundColor: '#0C2612',
    paddingTop: 48,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitulo: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.3,
    flex: 1,
  },

  // Scroll
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
    flexGrow: 1,
  },

  // Contador
  contadorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  contadorBadge: {
    backgroundColor: '#A1BF34',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  contadorTexto: {
    color: '#0C2612',
    fontSize: 12,
    fontWeight: '800',
  },
  contadorLabel: {
    color: '#1A4019',
    fontSize: 14,
    fontWeight: '500',
  },

  // Card
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  cardBarra: {
    width: 5,
    backgroundColor: '#A1BF34',
  },
  cardConteudo: {
    flex: 1,
    padding: 14,
  },
  cardTopo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  cardEsquerda: {
    flex: 1,
    marginRight: 8,
  },
  codigoNomeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  codigoBadge: {
    backgroundColor: '#0C2612',
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  codigoTexto: {
    color: '#A1BF34',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  nomeTexto: {
    color: '#1A4019',
    fontSize: 15,
    fontWeight: '700',
    flexShrink: 1,
  },
  descricaoTexto: {
    color: '#5A7A5E',
    fontSize: 12,
    lineHeight: 17,
  },
  btnRemover: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#FFFBEA',
  },

  // Próximo horário
  proximoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEF3EE',
  },
  proximoLabel: {
    color: '#8FA89C',
    fontSize: 12,
    flex: 1,
  },
  proximoHorario: {
    color: '#1A4019',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  semHorario: {
    color: '#AAAAAA',
    fontSize: 12,
    fontStyle: 'italic',
  },

  // Loading
  loadingWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingTexto: {
    color: '#5A7A5E',
    fontSize: 14,
  },

  // Erro
  erroBox: {
    alignItems: 'center',
    backgroundColor: '#FFF0F0',
    borderRadius: 12,
    padding: 20,
    margin: 16,
    gap: 8,
  },
  erroTexto: {
    color: '#CC3333',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
  btnTentar: {
    marginTop: 4,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#FF4444',
  },
  btnTentarTexto: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },

  // Não logado
  naoLogadoWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  naoLogadoIcone: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#E8F0DC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  naoLogadoTitulo: {
    color: '#1A4019',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  naoLogadoSubtitulo: {
    color: '#5A7A5E',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  btnEntrar: {
    backgroundColor: '#A1BF34',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  btnEntrarTexto: {
    color: '#0C2612',
    fontSize: 15,
    fontWeight: '700',
  },

  // Estado vazio
  vazioWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  vazioIcone: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#E8F0DC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  vazioTitulo: {
    color: '#1A4019',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  vazioSubtitulo: {
    color: '#5A7A5E',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },

  // Dica rodapé
  dicaBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#E8F0DC',
    borderRadius: 10,
    padding: 12,
    marginTop: 4,
  },
  dicaTexto: {
    flex: 1,
    color: '#3A5C3D',
    fontSize: 12,
    lineHeight: 17,
  },
});

export default styles;