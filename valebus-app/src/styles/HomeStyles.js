import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const styles = StyleSheet.create({

  // ── Layout base ─────────────────────────────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: '#F4F6F4',
  },

  // ── Header ───────────────────────────────────────────────────────────────
  header: {
    backgroundColor: COLORS.darkest, // #0C2612
    paddingTop: 52,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.light, // #A1BF34
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoCircleText: {
    color: COLORS.darkest,
    fontWeight: 'bold',
    fontSize: 12,
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
  logoAccent: {
    color: COLORS.light, // #A1BF34
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ── Barra de busca ────────────────────────────────────────────────────────
  searchBar: {
    backgroundColor: COLORS.dark, // #1A4019
    height: 46,
    borderRadius: 23,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 14,
    paddingVertical: 0, // evita altura extra no Android
  },

  // ── Dropdown de busca ────────────────────────────────────────────────────
  searchDropdown: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginTop: 4,
    borderRadius: 12,
    maxHeight: 240,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    zIndex: 99,
    overflow: 'hidden',
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5EEE5',
    gap: 12,
  },
  searchResultCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.darkest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchResultCodigo: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 10,
  },
  searchResultNome: {
    flex: 1,
    fontSize: 14,
    color: '#222',
  },

  // ── Corpo / scroll ────────────────────────────────────────────────────────
  body: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  // ── Cabeçalho de seção ────────────────────────────────────────────────────
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#111',
  },
  sectionLink: {
    fontSize: 13,
    color: COLORS.light,
    fontWeight: '600',
  },

  // ── Card de linha recente ─────────────────────────────────────────────────
  lineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.light,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    gap: 12,
  },
  circleNumber: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.darkest,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  circleNumberText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 11,
  },
  lineCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111',
    marginBottom: 4,
  },
  lineCardSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  lineCardSub: {
    fontSize: 12,
    color: '#555',
  },
  lineCardUltimo: {
    alignItems: 'flex-end',
    flexShrink: 0,
  },
  lineCardUltimoLabel: {
    fontSize: 10,
    color: '#999',
    marginBottom: 2,
  },
  lineCardUltimoHora: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.darkest,
  },

  // ── Estado vazio ──────────────────────────────────────────────────────────
  emptyState: {
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 32,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
  },
});