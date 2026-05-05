import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F6F2',
  },
  header: {
    backgroundColor: '#0C2612',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  btnVoltar: {
    padding: 4,
    marginRight: 12,
  },
  headerTitulo: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  btnLimpar: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A1BF34',
  },
  btnLimparTexto: {
    color: '#A1BF34',
    fontSize: 12,
    fontWeight: '600',
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
    marginBottom: 16,
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

  // Scroll
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
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
    backgroundColor: '#FF4444',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  contadorTexto: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  contadorLabel: {
    color: '#1A4019',
    fontSize: 14,
    fontWeight: '500',
  },

  // Card
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 12,
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  cardBarra: {
    width: 4,
  },
  cardConteudo: {
    flex: 1,
    padding: 14,
  },
  cardTopo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 8,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  cardTextos: {
    flex: 1,
  },
  cardTitulo: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19,
  },
  cardLinha: {
    color: '#5A7A5E',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
    letterSpacing: 0.3,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
    flexShrink: 0,
  },
  badgeTexto: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  cardDescricao: {
    color: '#4A5C4D',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
  },
  cardRodape: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  horarioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  horarioTexto: {
    color: '#8FA89C',
    fontSize: 11,
  },
  btnDismiss: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#F0F5F0',
  },
  btnDismissTexto: {
    color: '#8FA89C',
    fontSize: 11,
    fontWeight: '500',
  },

  // Estado vazio
  vazio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
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

  // Nota informativa
  notaBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#E8F0DC',
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
  },
  notaTexto: {
    flex: 1,
    color: '#3A5C3D',
    fontSize: 12,
    lineHeight: 17,
  },
});

export default styles;